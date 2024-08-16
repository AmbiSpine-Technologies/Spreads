import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../congif/emailConfig.js";
import ErrorHandler from "../utlis/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import {emitEvent, sendToken} from "../utlis/feature.js";
import cloudinary from "cloudinary";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/event.js";
import { TryCatched } from "../middlewares/errorMiddleware.js";
import Chat from "../models/chatModel.js";
import mongoose from "mongoose";
import Request from "../models/request.Model.js";
import { getOtherMember } from "../lib/helper.js";
export const hello = catchAsyncError((req, res) => {
    res.send("Hello Guys");
})


export const register = async (req, res) => {
    try {
        // Upload avatar to Cloudinary
        const myCloudAvatar = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        });

        // Default cover image URL
        const defaultCoverImage = 'https://example.com/path/to/default/cover/image.jpg'; 

        // Upload cover image to Cloudinary if provided
        let myCloudCover;
        if (req.body.coverImage) {
            myCloudCover = await cloudinary.v2.uploader.upload(req.body.coverImage, {
                folder: "covers",
                width: 800,
                crop: "scale"
            });
        }

        const { 
            firstName, 
            lastName, 
            username, 
            mobile, 
            email, 
            password, 
            termsAccepted = false, 
            bio = "" ,
            friends,
            occupation
        } = req.body;

        const avatar = {
            public_id: myCloudAvatar.public_id,
            url: myCloudAvatar.secure_url
        };

        const coverImage = req.body.coverImage
            ? {
                public_id: myCloudCover.public_id,
                url: myCloudCover.secure_url
            }
            : {
                public_id: 'default_cover_image_public_id', 
                url: defaultCoverImage
            };

        // Check if user with the same email or username exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const existingUserName = await User.findOne({ username });
        if (existingUserName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            username,
            mobile,
            email,
            password: hashedPassword,
            termsAccepted,
            bio,
            avatar,
            coverImage,
            friends,
            occupation,
            viewedProfile: Math.floor(Math.random()*1000),
            impressions: Math.floor(Math.random()*1000),
        });

        await newUser.save();

        // Send token
        sendToken(newUser, 200, res);

    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error" });
    }
};



export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
       
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & Password", 400));
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
        const isPasswordMatched = user.comparePassword(password);

        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password",401))
        }        
        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getUserInfo=async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    })
}

export const updateProfile = async (req, res, next) => {
    try {
        const newUserData = {
            username: req.body.username,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile,
            bio: req.body.bio,
            address: req.body.address
        };

        // Default cover image URL
        const defaultCoverImage = 'https://example.com/path/to/default/cover/image.jpg'; // Replace with your default cover image URL

        // Handle avatar update
        if (req.body.avatar && req.body.avatar !== "") {
            const user = await User.findById(req.user.id);

            // Check if user exists and has an avatar with a public_id
            if (user && user.avatar && user.avatar.public_id) {
                const imageId = user.avatar.public_id;

                // Destroy the existing avatar on Cloudinary
                await cloudinary.v2.uploader.destroy(imageId);
            }

            // Upload the new avatar to Cloudinary
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale",
            });

            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }

        // Handle cover image update
        if (req.body.coverImage && req.body.coverImage !== "") {
            const user = await User.findById(req.user.id);

            // Check if user exists and has a cover image with a public_id
            if (user && user.coverImage && user.coverImage.public_id) {
                const imageId = user.coverImage.public_id;

                // Destroy the existing cover image on Cloudinary
                await cloudinary.v2.uploader.destroy(imageId);
            }

            // Upload the new cover image to Cloudinary
            const myCloud = await cloudinary.v2.uploader.upload(req.body.coverImage, {
                folder: "covers",
                width: 800,
                crop: "scale",
            });

            newUserData.coverImage = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        } else {
            // Set default cover image if none is provided
            newUserData.coverImage = {
                public_id: 'default_cover_image_public_id', // Placeholder, you can use Cloudinary's response if uploading default image
                url: defaultCoverImage
            };
        }

        // Update the user profile in the database
        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user, 
        });
    } catch (error) {
        // Handle any errors
        next(error);
    }
};




export const changeUserPassword=async(req,res)=>{
    const {password,password_confirmation}= req.body;
    try{
        if(password && password_confirmation){
            if(password !== password_confirmation){
                res.status(400).json({
                    status:false,
                    message:"New Password and Confirm password dosen't match"
                })
            }else{
                 // Hash password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                console.log(req.user._id)
                await User.findByIdAndUpdate(req.user._id,{$set:{password:hashedPassword}})
                res.status(200).json({
                    status:true,
                    message:"Password Change Successfully"
                })
            }
        }else{
            res.status(400).json({
                status:false,
                message:"All Field are required"
            })
        }
    }catch (error) {
        res.status(500).json({ message: "Server error" });
    }

}


export const loggedUser=async(req,res)=>{
    res.send({"user":req.user})
}


export const sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            status: false,
            message: "Email is required."
        });
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                status: false,
                message: "Email doesn't exist."
            });
        }

        const secret = user._id + process.env.JWT_SECRET;
        const payload = { userId: user._id };
        const token = jwt.sign(payload, secret, { expiresIn: "15m" });

        const link = `http://localhost:3000/api/user/reset/${user._id}/${token}`;
        console.log(link);

        // Assuming transporter is already configured
        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Auth Application - Password Reset Link",
            html: `<a href="${link}">Click here to reset your password</a>`
        });

        res.status(200).json({
            status: true,
            message: "Password reset email sent. Please check your email.",
            "info":info
            
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error. Please try again later."
        });
    }
};


export const resetPasswordUser = async (req, res) => {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        const new_secret = user._id + process.env.JWT_SECRET;

        try {
            jwt.verify(token, new_secret);

            if (!password || !password_confirmation) {
                return res.status(400).json({
                    status: false,
                    message: "All fields are required."
                });
            }

            if (password !== password_confirmation) {
                return res.status(400).json({
                    status: false,
                    message: "New password and confirm password don't match."
                });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await User.findByIdAndUpdate(user._id, { $set: { password: hashedPassword } });

            res.status(200).json({
                status: true,
                message: "Password reset successfully."
            });
        } catch (jwtError) {
            return res.status(400).json({
                status: false,
                message: "Invalid or expired token."
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error. Please try again later."
        });
    }
};


// export const logout = async (req, res, next) => {
//     res.cookie("token", {
//         expires: new Date(Date.now()) ,
//         httpOnly: true,
//     });

//     res.status(200).json({
//         success: true,
//         message: "Logged Out"
//     });
// };

export const logout = async (req, res, next) => {
    res.cookie("token", {
        expires: new Date(Date.now()) ,
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
};

export const getOtherUser = async (req, res) => {
    try {
        const {id} = req.params;
        
        const user = await User.find({_id:{$ne:id}}).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "Currently do not have any user.",
                success: false
            });
        }

        return res.status(200).json({
            message: "User Detail retrived..",
            success: true,
            other:user,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error.",
            success: false
        });
    }
};


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params; 
        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User retrieved by ID successfully",
            success:true,
            user,
        });
    } catch (error) {
        res.status(500).json({ 
            status: "error",
            message: "Server error",
            error: error.message
        });
    }
};

export const searchUser = async (req, res) => {
    try {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ message: 'Query parameter is required' });
        }
        const users = await User.find({
            username: { $regex: username, $options: 'i' }
        }).limit(5).select('firstName lastName username avatar');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateUser = async (req, res, next) => {
    const { firstName, lastName, username, mobile, email, bio, address, profileImage } = req.body;

    const newUserData = {
        firstName,
        lastName,
        username,
        mobile,
        email,
        bio,
        address,
        profileImage
    };

    try {
        const user = await User.findByIdAndUpdate({_id:req.user.id}, newUserData, {
            new: true, 
            runValidators: true, 
            useFindAndModify: false, 
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteUser= async (req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User dose not exist with id:${req.params.id}`))
    }

    await user.remove

    res.status(200).json({
        success:true,
        message:"user delete successfully"
    });
};



  export const AllfollowingUser = async (req, res) => {
    try {
      const userId = req.user._id;

      const user = await User.findById(userId).populate('following', 'firstName lastName username avatar bio');
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const followedUsers = user.following;
  
      return res.status(200).json({ 
        success: true,
        followedUsers, 
        message: 'Followed users fetched successfully'
     });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  export const AllfollowUser = async (req, res) => {
    try {
      const userId = req.user._id;

      const user = await User.findById(userId).populate('followers', 'firstName lastName username avatar bio');
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const followedUsers = user.followers;
  
      return res.status(200).json({ 
        success: true,
        followedUsers, 
        message: 'Followed users fetched successfully'
     });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const bookmarksTweet = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const postId = req.params.id;
       

        const user = await User.findById(loggedInUserId);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        if (user.bookmarks.includes(postId)) {
            // Dislike
            await User.findByIdAndUpdate(
                loggedInUserId,
                { $pull: { bookmarks:  postId } }
            );
            return res.status(200).json({
                message: "Remove from bookmarks.",
                success: true
            });
        } else {
            // Like
            await User.findByIdAndUpdate(
                loggedInUserId,
                { $push: { bookmarks:  postId } }
            );
            return res.status(200).json({
                message: "Save to bookmarks",
                success: true
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error.",
            success: false
        });
    }
};

export const follow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;

        // Find the logged-in user and the user to be followed
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        // Check if the user to be followed exists
        if (!user) {
            return res.status(404).json({
                message: "User to follow not found.",
                success: false
            });
        }

        // Check if the logged-in user is already following the user
        if (user.followers.includes(loggedInUserId)) {
            return res.status(400).json({
                message: `You are already following ${user.firstName}`,
                success: false
            });
        }

        // Add the logged-in user to the followers of the user to be followed
        await user.updateOne({ $push: { followers: loggedInUserId } });

        // Add the user to be followed to the following list of the logged-in user
        await loggedInUser.updateOne({ $push: { following: userId } });

        return res.status(200).json({
            message: `${loggedInUser.firstName} is now following ${user.firstName}.`,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error.",
            success: false
        });
    }
};

export const unfollow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;

        // Find the logged-in user and the user to be unfollowed
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        // Check if the user to be unfollowed exists
        if (!user) {
            return res.status(404).json({
                message: "User to unfollow not found.",
                success: false
            });
        }

        // Check if the logged-in user is following the user
        if (!user.followers.includes(loggedInUserId)) {
            return res.status(400).json({
                message: `You are not following ${user.firstName}.`,
                success: false
            });
        }

        // Remove the logged-in user from the followers of the user to be unfollowed
        await user.updateOne({ $pull: { followers: loggedInUserId } });

        // Remove the user to be unfollowed from the following list of the logged-in user
        await loggedInUser.updateOne({ $pull: { following: userId } });

        return res.status(200).json({
            message: `${loggedInUser.firstName} has unfollowed ${user.firstName}`,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error.",
            success: false
        });
    }
};



export const userSearch = TryCatched(async (req, res, next) => {
    const { firstName = "" } = req.query;
    
    const myChats = await Chat.find({ groupChat: false, members: req.user?._id });

    
    const allUsersFromMyChats = myChats.flatMap(chat => chat.members);

    // Remove the current user from the list of members
    const allUsersExceptMe = allUsersFromMyChats.filter(userId => userId.toString() !== req.user._id.toString());

    // Fetch all users except those in the user's chats and the user themselves, matching the search term
    const allUsersExceptMeAndFriends = await User.find({
      _id: { $nin: allUsersExceptMe },
      firstName: { $regex: firstName, $options: "i" }
    });

    // Format the user data for response
    const users = allUsersExceptMeAndFriends.map(({ _id, firstName,lastName, avatar }) => ({
      _id,
      firstName,
      lastName,
      avatar: avatar[0]?.url 
    }));

    // Send response
    res.status(200).json({
      status: true,
      allUsersExceptMe,
      users
    });
});
  
  
export const sendFriendRequest = TryCatched(async (req, res, next) => {
    const { userId } = req.body;
  
    // Check if a request already exists between the users
    const request = await Request.findOne({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    });
  
    if (request) return next(new ErrorHandler('Request already sent', 400));
  
    // Create a new request
    await Request.create({
      sender: req.user._id,
      receiver: userId
    });
  
    // Emit the event for a new request
    emitEvent(req, NEW_REQUEST, [userId]);
  
    res.status(200).json({
      status: true,
      message: 'Friend request sent successfully!'
    });
  });

export const acceptFriendRequest = TryCatched(async (req, res, next) => {
    const { requestId, accept } = req.body;
  
    const request = await Request.findById(requestId)
      .populate('sender', 'firstName lastName')
      .populate('receiver', 'firstName lastName');
  
    if (!request) return next(new ErrorHandler('Request not found.', 404));
  
    if (request.receiver._id.toString() !== req.user._id.toString()) {
      return next(new ErrorHandler('You are not authorized to accept the request', 401));
    }
  
    if (!accept) {
      await request.deleteOne();
      return res.status(200).json({
        status: true,
        message: 'Friend request rejected successfully!'
      });
    }
  
    const members = [request.sender._id, request.receiver._id];
  
    await Promise.all([
      Chat.create({
        members,
        name: `${request.sender.firstName}-${request.receiver.firstName}`
      }),
      request.deleteOne()
    ]);
  
    emitEvent(req, REFETCH_CHATS, members);
  
    res.status(200).json({
      status: true,
      message: 'Friend request accepted successfully!',
      senderId: request.sender._id
    });
  });
  
  
  
export const getAllRequest = TryCatched(async (req, res, next) => {
    const userId = req.user._id;
  console.log(req.user)
    const requests = await Request.find({ receiver: userId })
      .populate('sender', 'firstName lastName avatar');
  
    const allRequests = requests.map(({ _id, sender }) => ({
      _id,
      sender: {
        _id: sender._id,
        name: `${sender.firstName} ${sender.lastName}`,
        avatar: sender.avatar ? sender.avatar[0].url : null
      }
    }));
  
    res.status(200).json({
      status: true,
      message: 'Request retrieved successfully!',
      allRequests
    });
  });
  
export const getMyFreind=TryCatched(async(req,res,next)=>{
  
    const chatId = req.query.chatId;
  
    const chat=await Chat.find({
      members:req.user?._id,
      groupChat:false,
    }).populate("members","firstName lastName avatar")
  
    const friends = chat.map(({members})=>{
  
      const otherUser=getOtherMember(members,req.user?._id);
  
      return{
        _id:otherUser._id,
        name:`${otherUser.firstName} ${otherUser.lastName}`,
        avatar:otherUser.avatar[0].url
      }
    });
  
    if(chatId){
      const chat = await Chat.findById(chatId);
  
      const availableFriend=friends.filter(
        (friend)=>!chat.members.includes(friend._id)
      )
  
      res.status(200).json({
        status: true,
        friends:availableFriend,
      });
    }else{
      res.status(200).json({
        status: true,
        friends,
      });
    }
  
  
    res.status(200).json({
      status: true,
      message: 'Notifications retrieved successfully!',
    });
  })
  
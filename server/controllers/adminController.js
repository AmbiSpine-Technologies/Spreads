import { adminSecretKey } from "../app.js";
import { TryCatched } from "../middlewares/errorMiddleware.js";
import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { cookieOptions } from "../utlis/feature.js";
import ErrorHandler from "../utlis/errorHandler.js";
import jwt from "jsonwebtoken"


export const adminPanel = TryCatched(async (req, res, next) => {
  res.status(200).json({
      success: true,
      message: "Welcome To Admin Panel"
  });
});



export const adminLogin = TryCatched(async (req, res, next) => {
  console.log('Admin login attempt');

  const { secretKey } = req.body;

  if (secretKey !== adminSecretKey) {
      return next(new ErrorHandler("Admin Key Invalid", 401));
  }

  let token;
  try {
      token = jwt.sign({ secretKey }, process.env.JWT_SECRET, { expiresIn: '1d' }); 
  } catch (error) {
      return next(new ErrorHandler("Invalid Token", 500));
  }

  return res
      .status(200)
      .cookie("admin-token", token, {
          ...cookieOptions,
          maxAge: 24 * 60 * 60 * 1000 // 1 day
      })
      .json({
          success: true,
          message: "Authenticated Successfully. Welcome to the Admin Panel."
      });
});



export const adminLogout = () => TryCatched(async (req, res, next) => {
    
    return res
        .status(200)
        .cookie("admin-token", "", {
            ...cookieOptions,
            maxAge:0
        })
        .json({
            success: true,
            message:"Logout Successfully"
        });
});

export const allUsers = TryCatched(async (req, res, next) => {
        const users = await User.find({});

        const transformedUsers = await Promise.all(users.map(async ({ firstName, lastName, username, avatar, _id }) => {
            const [group, friends] = await Promise.all([
                Chat.countDocuments({ groupChat: true, members: _id }),
                Chat.countDocuments({ groupChat: false, members: _id })
            ]);

            return {
                _id,
                name:`${firstName} ${lastName}`,
                username,
                avatar: avatar[0].url,
                group,
                friends,
            };
        }));

        res.status(200).json({
            status: true,
            message: 'Users retrieved successfully!',
            data: transformedUsers,
        });

})



export const allChat = TryCatched(async (req, res, next) => {

    const chats = await Chat.find({})
    .populate("members","name avatar")
    .populate("creator","firstName lastName avatar");

    const transformeChats=await Promise.all(
        chats.map(async({members,_id,groupChat,name,creator})=>{
            console.log(members)
            const totalMessage= await Message.countDocuments({chat:_id})
            return{
                _id,
                groupChat,
                name,
                avatar:members.slice(0,3).map((member)=>member.avatar[0].url),
                members:members.map(({_id,firstName ,lastName,avatar})=>({
                    _id,
                    firstName,
                    lastName,
                    avatar:avatar[0].url,
                })),
                creator:{
                    name:`${creator?.firstName} ${creator?.lastName } `|| "None",
                    avatar:creator?.avatar[0].url || "",
                },
                totalMembers:members.length,
                totalMessage,
            }
        })
    )
    
    res.status(200).json({
        status: true,
        message: 'Chat retrieved successfully!',
        transformeChats,
    });

})

// controllers/postController.js
export const allPost = TryCatched(async (req, res, next) => {
  const posts = await Post.find({})
    .populate("author", "name avatar email");

  const transformedPosts = posts.map(({ _id, content, postedBy, author, images,  likes, comments, createdAt, }) => ({
    _id,
    content,
    postedBy,
    author: {
      _id: author._id,
      name:author.name,
      avatar: author.avatar,
      email: author.email
    },
    images,
    likes: likes.length,
    comments: comments.length,
    createdAt,
  }));

  res.status(200).json({
    status: true,
    message: 'Posts retrieved successfully!',
    posts: transformedPosts
  });
});


export const allMessage = TryCatched(async (req, res, next) => {

    const messages = await Message.find({})
    .populate("sender","firstName lastName avatar")
    .populate("chat","groupChat");

    const transformeMessage=messages.map(
        ({_id,attachments,content,sender,createdAt,chat})=>({
            _id,
            attachments,
            content,
            createdAt,
            chat:chat._id,
            groupChat:chat.groupChat,
            sender:{
                _id:sender._id,
                name:`${sender.firstName} ${sender.lastName}`,
                avatar:sender.avatar[0].url
            }
        })
    )

    
    
    res.status(200).json({
        status: true,
        message: 'Message retrieved successfully!',
        transformeMessage,
    });

})

export const getDashboardStatus = TryCatched(async (req, res, next) => {
  const [groupsCount, userCount, messageCount, totalChatsCount, postCount] = await Promise.all([
    Chat.countDocuments({ groupChat: true }),
    User.countDocuments(),
    Message.countDocuments(),
    Chat.countDocuments(),
    Post.countDocuments()
  ]);

  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const [last7DaysMessages, last7DaysPosts] = await Promise.all([
    Message.find({
      createdAt: {
        $gte: last7Days,
        $lte: today
      }
    }).select("createdAt"),
    Post.find({
      createdAt: {
        $gte: last7Days,
        $lte: today
      }
    }).select("createdAt")
  ]);

  const messages = new Array(7).fill(0);
  const posts = new Array(7).fill(0);
  const dayInMilliseconds = 1000 * 60 * 60 * 24;

  last7DaysMessages.forEach((message) => {
    const indexApprox = (today.getTime() - message.createdAt.getTime()) / dayInMilliseconds;
    const index = Math.floor(indexApprox);
    messages[6 - index]++;
  });

  last7DaysPosts.forEach((post) => {
    const indexApprox = (today.getTime() - post.createdAt.getTime()) / dayInMilliseconds;
    const index = Math.floor(indexApprox);
    posts[6 - index]++;
  });

  const stats = {
    groupsCount,
    userCount,
    messageCount,
    totalChatsCount,
    postCount,
    messagesChart: messages,
    postsChart: posts,
  };

  res.status(200).json({
    status: true,
    stats
  });
});


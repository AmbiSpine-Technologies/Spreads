import { text } from 'express';
import Post from '../models/postModel.js';
import ErrorHandler from '../utlis/errorHandler.js';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import cloudinary from "cloudinary";
import getDataUri from '../utlis/dataUri.js';

export const createPost = async (req, res, next) => {
  try {
    // Handle media uploads (images/videos/audio)
    let images = [];
    let videos = [];
    let audio = null;

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else if (Array.isArray(req.body.images)) {
      images = req.body.images;
    }

    // Check and parse videos
    if (typeof req.body.videos === "string") {
      videos.push(req.body.videos);
    } else if (Array.isArray(req.body.videos)) {
      videos = req.body.videos;
    }

    // Check and parse audio
    if (typeof req.body.audio === "string") {
      audio = req.body.audio;
    }

    const imageLinks = [];

    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: 'posts',
        });

        imageLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

     // Upload videos to Cloudinary
     const videoLinks = [];
    for (let i = 0; i < videos.length; i++) {
      const result = await cloudinary.v2.uploader.upload(videos[i], {
        resource_type: 'video', // Specify video
        folder: 'posts',
      });
      videoLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

 
     // Upload audio to Cloudinary
     let audioLink = null;
     if (audio) {
       const result = await cloudinary.v2.uploader.upload(audio, {
         folder: 'posts/audio',
         resource_type: 'video', // Set as 'video' to allow audio files
       });
       audioLink = {
         public_id: result.public_id,
         url: result.secure_url,
       };
     }
 
     req.body.videos = videoLinks;
     req.body.audio = audioLink;

    req.body.images = imageLinks;

    // Ensure req.user.avatar is a string (URL)
    const avatarUrl = typeof req.user.avatar === 'string' ? req.user.avatar : (req.user.avatar?.[0]?.url || '');

    // Create a new post
    const post = await Post.create({
      ...req.body,
      postedBy: req.user._id,
      author: {
        avatar: avatarUrl, // Set the URL directly
        name: `${req.user.firstName} ${req.user.lastName}`,
        username: req.user.username,
        email: req.user.email,
      },
      gif: req.body.gif || null,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    next(error);
  }
};


// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('postedBy', 'name') // Populate the 'postedBy' field
      .populate('comments.postedBy', 'name'); // Populate 'postedBy' in comments

    res.status(200).json({
      status: true,
      message: "All Posts fetched Successfully..!!",
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('postedBy', 'name') // Populate the 'postBy' field
      .populate('comments.postedBy', 'name'); // Populate 'postBy' in comments

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({
      status: true,
      message: "Post fetched by Id Successfully..!!",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single post by ID
export const getMyPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const post = await Post.find({postBy:userId})
      .populate('postedBy', '_id name')

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({
      status: true,
      message: "Post fetched by PostId Successfully..!!",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update a post by ID
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({
      status: true,
      message: "Post updated Successfully..!!",
      post,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const LikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id;

    // Validate userId and postId
    if (!userId || !postId) {
      return res.status(400).json({ message: 'User ID and Post ID are required' });
    }

    // Check if postId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid Post ID' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user already liked the post
    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    // Add user to the likes array
    post.likes.push(userId);
    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      message: 'Post liked successfully',
      post: updatedPost,
    });
  } catch (error) {
    console.error('Error liking post:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

export const  UnlikePost=async(req,res)=>{
  try {
    const { postId } = req.body;
    const userId = req.user._id;
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
  
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Post Unliked successfully',
      post: updatedPost,
    });
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createComment = async (req, res, next) => {
  try {
    const { postId, comment } = req.body;

    if (!comment || !postId) {
      return res.status(400).json({
        success: false,
        message: "Comment and postId are required",
      });
    }

    const avatarUrl = typeof req.user.avatar === 'string' ? req.user.avatar : (req.user.avatar?.[0]?.url || '');

    // Create the comment object
    const comments = {
      postedBy: req.user._id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      avatar: avatarUrl,
      comment,
    };

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Add the comment to the post's comments array
    post.comments.push(comments);

    // Save the post with validation
    await post.save();

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Comment added successfully",
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addReply = async (req, res) => {
  const { postId, commentId } = req.params;
  const { reply } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    const avatarUrl = typeof req.user.avatar === 'string' ? req.user.avatar : (req.user.avatar?.[0]?.url || '');
    const newReply = {
      postedBy: req.user._id,
      avatar: avatarUrl,
      name: `${req.user.firstName} ${req.user.lastName}`,
      reply,
    };

    comment.replies.push(newReply);
    await post.save();

    res.status(201).json({ message: 'Reply added successfully', post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const GetAllComments = async (req, res, next) => {
  try {
    const postId = req.query.id;

    // Validate postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID"
      });
    }

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    res.status(200).json({
      success: true,
      comments: post.comments
    });
  } catch (error) {
    console.error(`Error fetching comments for post ${req.query.id}: `, error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const deleteCommentAndReply = async (req, res, next) => {
  try {
    const { postId, commentId, replyId } = req.query;

    if (!postId || !commentId) {
      return res.status(400).json({
        success: false,
        message: "postId and commentId are required"
      });
    }

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    // Check if it's a reply deletion
    if (replyId) {
      // Find the comment
      const comment = post.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Comment not found"
        });
      }

      // Check if the reply exists
      const replyExists = comment.replies.some(reply => reply._id.toString() === replyId);
      if (!replyExists) {
        return res.status(404).json({
          success: false,
          message: "Reply not found"
        });
      }

      // Filter out the reply from the comment's replies array
      comment.replies = comment.replies.filter(reply => reply._id.toString() !== replyId);
    } else {
      // Check if the comment exists in the post's comments array
      const commentExists = post.comments.some(comment => comment._id.toString() === commentId);
      if (!commentExists) {
        return res.status(404).json({
          success: false,
          message: "Comment not found"
        });
      }

      // Filter out the comment from the post's comments array
      post.comments = post.comments.filter(comment => comment._id.toString() !== commentId);
    }

    // Save the post with the updated comments or replies array
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment or reply deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const MarkNotInterested = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user.notInterestedPosts.includes(postId)) {
      user.notInterestedPosts.push(postId);
      await user.save();
    }

    res.status(200).json({ message: 'Post marked as not interested' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const AllGetPost = async (req, res) => {
  //loggedInUser + following Post
  try {
      const id = req.params.id;
      const loggedInUser=await User.findById(id);

      const loggedInUserPost = await Post.find({postedBy:id}); 
      const followingUserPost=await Promise.all(loggedInUser.following.map((otherId)=>{
          return  Post.find({postedBy:otherId})
      }))            
      return res.status(200).json({
          success: true,
          posts:loggedInUserPost.concat(...followingUserPost)
      });

  } catch (error) {
      console.error(error);
      return res.status(500).json({
          message: "Server error.",
          success: false
      });
  }
};

export const getFollowingPost = async (req, res) => {
  //following Post
  try {
      const id = req.params.id;
      const loggedInUser=await User.findById(id);
      const followingUserPost=await Promise.all(loggedInUser.following.map((otherId)=>{
          return  Tweet.find({userId:otherId})
      }))            
      return res.status(200).json({
          success: true,
          posts:[].concat(...followingUserPost)
      });

  } catch (error) {
      console.error(error);
      return res.status(500).json({
          message: "Server error.",
          success: false
      });
  }
};


export const likeOrDislikePost = async (req, res) => {
  try {
      const loggedInUserId = req.body.id;
      const postId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(postId)) {
          return res.status(400).json({
              message: "Invalid post ID.",
              success: false
          });
      }

      const post = await Post.findById(postId);

      if (!post) {
          return res.status(404).json({
              message: "Post not found.",
              success: false
          });
      }

      if (post.likes.includes(loggedInUserId)) {
          // Dislike
          await Post.findByIdAndUpdate(
              postId,
              { $pull: { likes: loggedInUserId } }
          );
          return res.status(200).json({
              message: "User disliked your post.",
              success: true
          });
      } else {
          // Like
          await Post.findByIdAndUpdate(
              postId,
              { $push: { likes: loggedInUserId } }
          );
          return res.status(200).json({
              message: "User liked your post.",
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




export const getPostReplyDetails = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('comments.replies.postedBy', 'name avatar') 
      .exec();
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



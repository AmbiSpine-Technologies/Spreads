import Post from "../models/postModel.js";

export const hello =async(req, res) => {
    res.send("Hello Comment Guys");
}
// Like a comment
export const likeComment = async (req, res) => {
    const { postId, commentId } = req.params;
    const userId = req.user._id;
  
    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      const comment = post.comments.id(commentId);
      if (!comment) return res.status(404).json({ message: "Comment not found" });
  
      if (comment.likes.includes(userId)) {
        // If user already liked, remove the like
        comment.likes.pull(userId);
      } else {
        // Otherwise, add the like
        comment.likes.push(userId);
      }
  
      await post.save();
      res.status(200).json({ message: "Comment liked/disliked successfully", comment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const dislikeComment = async (req, res) => {
    const { postId, commentId } = req.params;
    const userId = req.user._id;
  
    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      const comment = post.comments.id(commentId);
      if (!comment) return res.status(404).json({ message: "Comment not found" });
  
      if (comment.dislikes.includes(userId)) {
        // If user already disliked, remove the dislike
        comment.dislikes.pull(userId);
      } else {
        // Otherwise, add the dislike
        comment.dislikes.push(userId);
      }
  
      await post.save();
      res.status(200).json({ message: "Comment disliked/undisliked successfully", comment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const likeReply = async (req, res) => {
    const { postId, commentId, replyId } = req.params;
    const userId = req.user._id; 
  
    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      const comment = post.comments.id(commentId);
      if (!comment) return res.status(404).json({ message: "Comment not found" });
  
      const reply = comment.replies.id(replyId);
      if (!reply) return res.status(404).json({ message: "Reply not found" });
  
      if (reply.likes.includes(userId)) {
        // If user already liked, remove the like
        reply.likes.pull(userId);
      } else {
        // Otherwise, add the like
        reply.likes.push(userId);
      }
  
      await post.save();
      res.status(200).json({ message: "Reply liked/disliked successfully", reply });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Dislike a reply
  export const dislikeReply = async (req, res) => {
    const { postId, commentId, replyId } = req.params;
    const userId = req.user._id; 
  
    try {
      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      const comment = post.comments.id(commentId);
      if (!comment) return res.status(404).json({ message: "Comment not found" });
  
      const reply = comment.replies.id(replyId);
      if (!reply) return res.status(404).json({ message: "Reply not found" });
  
      if (reply.dislikes.includes(userId)) {
        // If user already disliked, remove the dislike
        reply.dislikes.pull(userId);
      } else {
        // Otherwise, add the dislike
        reply.dislikes.push(userId);
      }
  
      await post.save();
      res.status(200).json({ message: "Reply disliked/undisliked successfully", reply });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
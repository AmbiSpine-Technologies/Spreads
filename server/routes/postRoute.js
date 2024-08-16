import express from 'express';
import {
    createPost, getPosts, getPostById, updatePost, deletePost,
    LikePost, UnlikePost, createComment, GetAllComments,
    MarkNotInterested,
    getFollowingPost,
    likeOrDislikePost,
    AllGetPost,
    addReply,
    getPostReplyDetails,
    deleteCommentAndReply,
   
} from "../controllers/postController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";



const postRoutes = express.Router();

// Create a new post with file uploads
postRoutes.post('/create', 
    isAuthenticatedUser, 
    createPost
  );

// Get all posts
postRoutes.get('/', getPosts);

// Get a post by ID
postRoutes.get('/:id', getPostById);

// Get posts for the authenticated user (consider if this needs specific functionality)
postRoutes.get('/mypost', isAuthenticatedUser, getPosts); 
// Update a post by ID
postRoutes.put('/:id', isAuthenticatedUser, updatePost);

// Delete a post by ID
postRoutes.delete('/:id', isAuthenticatedUser, deletePost);

// Like a post
postRoutes.post('/like', isAuthenticatedUser, LikePost);

// Unlike a post
postRoutes.post('/unlike', isAuthenticatedUser, UnlikePost);

postRoutes.get("/all/:id",isAuthenticatedUser,AllGetPost)
postRoutes.get("/follwingpost/:id",isAuthenticatedUser,getFollowingPost)
postRoutes.put("/like/:id",isAuthenticatedUser,likeOrDislikePost);
// Create a comment on a post
postRoutes.post('/comment', isAuthenticatedUser, createComment);

// Get all comments for a specific post
postRoutes.get('/comment/all', GetAllComments); 

// Delete a comment
postRoutes.delete('/comment/delete', isAuthenticatedUser,deleteCommentAndReply);

postRoutes.post('/not-interested/:postId', isAuthenticatedUser, MarkNotInterested);
postRoutes.post('/:postId/comment/:commentId/reply', isAuthenticatedUser, addReply);
postRoutes.get('/reply/:postId',getPostReplyDetails)




export default postRoutes;

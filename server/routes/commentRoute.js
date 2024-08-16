import express from 'express';
import { isAuthenticatedUser } from '../middlewares/auth.js';
import {
  dislikeComment,
  dislikeReply,
  hello,
  likeComment,
  likeReply
} from '../controllers/commentController.js';

const commentRoutes = express.Router();


commentRoutes.use(isAuthenticatedUser);

commentRoutes.get("/",hello)

commentRoutes.post('/posts/:postId/comments/:commentId/like', likeComment);

commentRoutes.post('/posts/:postId/comments/:commentId/dislike', dislikeComment);

commentRoutes.post('/posts/:postId/comments/:commentId/replies/:replyId/like', likeReply);

commentRoutes.post('/posts/:postId/comments/:commentId/replies/:replyId/dislike', dislikeReply);

export default commentRoutes;

// import { configureStore } from "@reduxjs/toolkit";
// import { userReducer } from "./reducers/userReducer";
// import { postsReducer } from "./reducers/postReducer";

// const store = configureStore({
//     reducer:{
//         user:userReducer,
//         posts:postsReducer
//     },
//     devTools: process.env.NODE_ENV !== 'production',
// })

// export default store

// store.js
import { createStore,combineReducers, applyMiddleware } from 'redux';
import *as thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { commentReducer, newCommentReducer, newPostReducer, postsReducer,
  postCommentReducer, postReducer, postDetailsReducer, postLikeReducer, 
  InterestedPostsReducer,
  refreshReducer,
  commentDeleteReducer} from './reducers/postsReducer';
import { AllfollowedUsersReducer,
   bookmarkPostReducer,
   getAllUserReducer, userDetailsReducer,
    userFollowingReducer, userReducer, userSearchReducer, userUpdateProfileReducer } from './reducers/usersReducer';
import { commentsLikeReducer, notificationReducer } from './reducers/commentReducer';
import { attachmentReducer, chatDetailsReducer, chatReducer, friendRequestReducer, messageAlertReducer, messageReducer } from './reducers/chatReducer';
import { adminReducer } from './reducers/adminReducer';


const rootReducer=combineReducers({
    user:userReducer,
    allUsers: getAllUserReducer,
    userSearch: userSearchReducer,
    posts:postsReducer,
    post:postReducer,
    newPost: newPostReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    newComment: newCommentReducer,
    comment:commentReducer,
    commentDelete:commentDeleteReducer,
    postComments:postCommentReducer,
    postDetail:postDetailsReducer,
    like: postLikeReducer,
    Interested:InterestedPostsReducer,
    allFollow:AllfollowedUsersReducer,
    refresh: refreshReducer,
    following:userFollowingReducer,
    bookmark:bookmarkPostReducer,
    commentlike:commentsLikeReducer,
    chat: chatReducer,
    request:friendRequestReducer,
    notification:notificationReducer,
    chatDetails:chatDetailsReducer,
    message:messageReducer,
    attachment:attachmentReducer,
    messageAlerts: messageAlertReducer,
    admin:adminReducer
})

const middleware = [thunk.withExtraArgument()];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store



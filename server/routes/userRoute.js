import express from 'express';
import { hello, register,
     login, changeUserPassword,
     loggedUser, sendUserPasswordResetEmail,
     resetPasswordUser, logout, 
     getUserById, searchUser,
     updateUser,
     deleteUser,
     getUserInfo,
     updateProfile,
     AllfollowUser,
     AllfollowingUser,
     follow,
     unfollow,
     bookmarksTweet,
     getOtherUser,
     sendFriendRequest,
     acceptFriendRequest,
     userSearch,
     getMyFreind,
     getAllRequest, } from '../controllers/userController.js';
import authUserToken from '../middlewares/authMiddleare.js';
import {isAuthenticatedUser} from "../middlewares/auth.js"
import { multerUpload } from '../middlewares/multer.js';
const router = express.Router();


router.route('/').get(hello);
// router.post('/register',multerUpload.single("avatar"),register);
router.post('/register',register);
router.route('/login').post(login);
router.route('/send-reset/password/email').post(sendUserPasswordResetEmail);
router.route("/reset-password/:id/:token").post(resetPasswordUser);
router.route('/me').get(isAuthenticatedUser, getUserInfo);
router.route('/update/me').put(isAuthenticatedUser, updateProfile);

router.put('/update/:id',isAuthenticatedUser , updateUser);

router.route("/logout").get(logout);
router.get("/other/:id",isAuthenticatedUser,getOtherUser)

router.get('/search', searchUser);

router.get('/followed/all',isAuthenticatedUser,AllfollowUser);
router.get('/following/all', isAuthenticatedUser,AllfollowingUser);

router.route("/:id").get(getUserById).delete(deleteUser);

router.post("/follow/:id",isAuthenticatedUser,follow)
router.post("/unfollow/:id",isAuthenticatedUser,unfollow)
router.put("/bookmarks/:id",isAuthenticatedUser,bookmarksTweet)
// Protected routes
router.route('/changepwd').post(isAuthenticatedUser, changeUserPassword);
router.route('/logged').get(isAuthenticatedUser, loggedUser);

//chat
router.get('/chat/search', userSearch);

router.put('/sendrequest',isAuthenticatedUser,  sendFriendRequest);
router.put('/acceptrequest',isAuthenticatedUser, acceptFriendRequest);
router.get("/chat/notification",isAuthenticatedUser,getAllRequest);
router.get("/chat/friend",isAuthenticatedUser,getMyFreind);

export default router;

import express from "express";
import {
    adminLogin,
    adminPanel,
    adminLogout,
    allChat,
    allMessage,
    allPost,
    allUsers,
    getDashboardStatus
} from "../controllers/adminController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";




const adminRouter = express.Router();

// Validate admin login credentials
adminRouter.post("/login",  adminLogin);

// Admin logout route
adminRouter.get("/logout", adminLogout);

// Only Admin Can access the route
adminRouter.get("/", adminPanel);
// Get all users

adminRouter.get("/users", isAdminAuthenticated, allUsers);
adminRouter.get("/chats", isAdminAuthenticated, allChat);
adminRouter.get("/posts", isAdminAuthenticated, allPost);
adminRouter.get("/messages", isAdminAuthenticated, allMessage);
adminRouter.get("/status", isAdminAuthenticated, getDashboardStatus);

export default adminRouter;

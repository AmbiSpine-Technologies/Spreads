import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utlis/errorHandler.js"


export const isAuthenticatedUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    try {
        // Verify the token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch user by ID
        const user = await User.findById(decodedData.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: "User not found, authorization denied" });
        }

        // Attach user to the request object
        req.user = user;

        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
};


export const isAdminAuthenticated = (req, res, next) => {
    const token = req.cookies["admin-token"];

    if (!token) {
        return next(new ErrorHandler("Access Denied. No token provided.", 403));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (ex) {
        return next(new ErrorHandler("Invalid or expired token.", 403));
    }
};


export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource`,
                     403
                    )
                );
        }

        next();
    };
};

export const socketAuthenticator = async (socket, next) => {
    try {
        const authToken = socket.request.cookies['token'];

        if (!authToken) {
            return next(new ErrorHandler("Please login to access this route", 401));
        }

        // Verify the token
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

        // Fetch user by ID
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        // Attach user to the socket object
        socket.user = user;

        next(); // Proceed with the connection
    } catch (error) {
        next(new ErrorHandler("Invalid or expired token", 401)); // Pass error to Socket.IO
    }
};



import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './congif/connectdb.js';
import cors from 'cors';
import router from './routes/userRoute.js';
import { errorMiddleware } from './middlewares/error.js';
import postRoutes from './routes/postRoute.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import routerEvent from './routes/eventRoute.js';
import chatRoute from './routes/chat.js';
import createUser from './seeders/user.js';
import { createMessages, createMessagesInChat, createSingleChat, createSingleGroup } from './seeders/chat.js';
import adminRouter from './routes/admin.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import cloudinary from "cloudinary";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from './constants/event.js';
import { v4 as uuidv4 } from 'uuid';
import { getSockets } from './lib/helper.js';
import Message from './models/messageModel.js';
import commentRoutes from './routes/commentRoute.js';
import { socketAuthenticator } from './middlewares/auth.js';


dotenv.config();

// Create HTTP server
const app = express();
const server = createServer(app);
// Configure Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT",'DELETE'],
    credentials: true,
  },
});

app.set("io",io)

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Connect to database
const mongodbURL = process.env.URL;
connectDatabase(mongodbURL);


export const  adminSecretKey = process.env.ADMIN_SECRET_KEY || "jfdkjdkjkldlk";

export const userSocketIDs = new Map()


cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

console.log("Cloudinary configuration:");
console.log("Cloud Name:", process.env.CLOUDINARY_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Not Loaded");

// Load routes
app.use('/api/user', router);
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRouter);
app.use('/api/comments', commentRoutes);
app.use('/api/chat', chatRoute);
app.use('/api/event', routerEvent);


io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, async () => {
    try {
      await socketAuthenticator(socket, next);
    } catch (err) {
      next(err);
    }
  });
});


// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected', { socketId: socket.id });
  
  const user = socket.user
  //all connecated user/currently active
  userSocketIDs.set(user._id.toString(),socket.id);

 

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    if (!message || !chatId || !members || !user._id) {
      console.error('Invalid message data:', { chatId, members, message, user });
      return;
    }
  
    const senderName = `${user.firstName} ${user.lastName}` || 'Unknown User';
  
    const messageForRealTime = {
      content: message,
      _id: uuidv4(),
      sender: {
        _id: user._id,
        name: senderName, 
      },
      chat: chatId,
      createdAt: new Date().toISOString()
    };
  
    
      const memberSocket = getSockets(members);
     
  
      io.to(memberSocket).emit(NEW_MESSAGE, { chatId, message: messageForRealTime });
      io.to(memberSocket).emit(NEW_MESSAGE_ALERT, { chatId });
  
      const messageForDB = {
        content: message,
        sender: user._id,
        chat: chatId,
      };
      try {
      await Message.create(messageForDB);
    } catch (error) {
      console.error('Error handling new message event:', error);
    }
  });
  

 
  socket.on('disconnect', () => {
    console.log('User disconnected', { socketId: socket.id });
    userSocketIDs.delete(user._id.toString())
  });
});

// Error Middleware
app.use(errorMiddleware);

// Server and graceful shutdown
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to Unhandled Promise Rejection');

  server.close(() => {
    process.exit(1);
  });
});

import express from 'express';
import multer from 'multer';

import { newGroupChat
    ,myAllChat,
    myGroups,
    addMember, 
    removeMember, 
    leaveGroup, 
    sendAttachment,
    getDetailMessage,
    renameGroup,
    deleteChat,
    getMessage
} from '../controllers/chatController.js';
import {attachementMulter} from '../middlewares/multer.js';
import { addMemberValidator,  
    newGroupValidator,
     removeMemberValidator,
      validatorHandler,
      sendAttachementValidator,
      chatIdValidator,
      renameValidator
     } from '../lib/Validators.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';

const upload = multer(); 
const chatRoute = express.Router();

chatRoute.use(isAuthenticatedUser)

chatRoute.post("/new",newGroupValidator(),validatorHandler,newGroupChat)
chatRoute.get("/mychat",myAllChat)
chatRoute.get("/mygroup",myGroups)
chatRoute.put("/addmember",addMemberValidator(),validatorHandler,addMember)
chatRoute.put("/removemember",removeMemberValidator(),validatorHandler,removeMember)
chatRoute.delete("/leave/:id",chatIdValidator(),validatorHandler,leaveGroup)
chatRoute.put("/renameg",renameGroup)

//send attachement
chatRoute.post('/send-attachment', attachementMulter,sendAttachment);

chatRoute.route("/:id").get(getDetailMessage)
.put(renameValidator(),validatorHandler,renameGroup)
.delete(deleteChat)

chatRoute.get("/message/:id",chatIdValidator(),validatorHandler, getMessage)

export default chatRoute;
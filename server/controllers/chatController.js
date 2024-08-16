import { ALERT, NEW_ATTACHEMENT, NEW_MESSAGE, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMember } from "../lib/helper.js";
import { TryCatched } from "../middlewares/errorMiddleware.js ";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";
import ErrorHandler  from "../utlis/errorHandler.js";
import { deleteFileFromCloundry, emitEvent, uploadFileToCloudinary } from "../utlis/feature.js";
import Message from "../models/messageModel.js";
import mongoose from 'mongoose';


export const newGroupChat=TryCatched(async(req,res,next)=>{

    const {name,members} = req.body;
    console.log(req.user)
    if(members.length < 2){
        new ErrorHandler("Group Chat must have  atleast  2 members ",400)
    }

    const allMembers =[...members,req.user];

    const chat = await Chat.create({
        name,
        groupChat:true,
        creator:req.user,
        members:allMembers,

    })

    emitEvent(req,ALERT,allMembers,`Welcome To ${name} Group`);
    emitEvent(req,REFETCH_CHATS,members)

    res.status(200).json({
        success:true,
        message:"New Group  Created successsfully.."
    })
})

export const myAllChat = TryCatched(async (req, res, next) => {
    try {
        const chats = await Chat.find({ members: req.user?._id })
            .populate({
                path: 'members',
                select: 'firstName lastName avatar', 
            });

        
        const transformChat = chats.map(({ _id, name, members, groupChat }) => {
            // Find the other member for single chats
            const otherMember = groupChat ? null : getOtherMember(members, req.user?._id);

            return {
                _id,
                groupChat,
                avatar: groupChat 
                    ? members.slice(0, 3).map(member => member.avatar[0]?.url)
                    : otherMember?.avatar[0]?.url, 
                name: groupChat 
                    ? name 
                    : `${otherMember?.firstName} ${otherMember?.lastName}`,
                members: members
                    .filter(member => !member._id.equals(req.user?._id)) 
                    .map(({ _id }) => _id), // Map to include only member IDs
            };
        });

        // Send transformed data in the response
        res.status(200).json({
            success: true,
            chats: transformChat,
        });
    } catch (error) {
        next(error);
    }
});

export const myGroups=TryCatched(async(req,res,next)=>{
    const chat= await Chat.find({
        members:req.user,
        groupChat:true,
        creator:req.user,
    }).populate("members","name avatar");

    const groups=chat.map(({members,_id,groupChat,name})=>({
        _id,
        groupChat,
        name,
       avatar: members.slice(0,3).map(({avatar})=>avatar[0]?.url),
    }))


    res.status(200).json({
        success: true,
        groups,
    });
})

export const addMember = TryCatched(async (req, res, next) => {
    const { chatId, members } = req.body;

   
    const chat = await Chat.findById(chatId);

    // Check for empty members array
    if (!members || members.length === 0) {
        return next(new ErrorHandler("Please provide at least one member", 400));
    }

    // Check if chat exists
    if (!chat) {
        return next(new ErrorHandler("Chat not found", 404));
    }

    // Ensure it's a group chat
    if (!chat.groupChat) {
        return next(new ErrorHandler("This is not a group chat", 400));
    }

    // Ensure the current user is the creator
    if (chat.creator.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not allowed to add members", 403));
    }

    // Fetch user details for all new members
    const allNewMembersPromise = members.map((id) => User.findById(id, "firstName"));
    const allNewMembers = await Promise.all(allNewMembersPromise);

    // Filter out members who are already in the chat
    const uniqueMembers = allNewMembers
        .filter(user => user && !chat.members.includes(user._id.toString())) // Ensure user is found
        .map(user => user._id);

    // Check if adding these members will exceed the limit
    if (chat.members.length + uniqueMembers.length > 100) {
        return next(new ErrorHandler("Group members limit reached", 400));
    }

    chat.members.push(...uniqueMembers);

    
    await chat.save();

    // Prepare the list of usernames for notification
    const allUserNames = allNewMembers
        .filter(user => uniqueMembers.includes(user._id)) // Filter only newly added members
        .map(user => user.firstName)
        .join(", ");

    // Emit events
    emitEvent(req, 'ALERT', chat.members, `${allUserNames} has been added to the group`);
    emitEvent(req, 'REFETCH_CHATS', chat.members);

    // Send response
    res.status(200).json({
        success: true,
        message: "Members added successfully"
    });
});

export const removeMember = TryCatched(async (req, res, next) => {
    const { userId, chatId } = req.body;

    // Fetch chat and user details
    const [chat, userToBeRemoved] = await Promise.all([
        Chat.findById(chatId),
        User.findById(userId, "firstName")
    ]);

    // Check if chat exists
    if (!chat) {
        return next(new ErrorHandler("Chat not found", 404));
    }

    // Ensure it's a group chat
    if (!chat.groupChat) {
        return next(new ErrorHandler("This is not a group chat", 400));
    }

    // Ensure the current user is the creator
    if (chat.creator.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not allowed to remove members", 403));
    }

    // Ensure there are more than 3 members remaining
    if (chat.members.length <= 3) {
        return next(new ErrorHandler("Group must have at least 3 members", 400));
    }

    // Remove the member from the chat
    chat.members = chat.members.filter(member => member.toString() !== userId.toString());

    // Save the updated chat
    await chat.save();

    // Check if userToBeRemoved is found before emitting events
    if (userToBeRemoved) {
        emitEvent(req, 'ALERT', chat.members, `${userToBeRemoved.firstName} has been removed from the group`);
    }

    emitEvent(req, 'REFETCH_CHATS', chat.members);

   
    res.status(200).json({
        success: true,
        message: "Member removed successfully"
    });
});



export const leaveGroup = TryCatched(async (req, res, next) => {
    const chatId = req.params.id;

    const chat = await Chat.findById(chatId);

    if (!chat) {
        return next(new ErrorHandler("Chat Not Found", 404));
    }

    if (!chat.groupChat) {
        return next(new ErrorHandler("This is not a group chat", 400));
    }

    const remainingMembers = chat.members.filter((member) => member.toString() !== req.user.toString());
    
    if (remainingMembers.length < 3) {
        return next(new ErrorHandler("Group must have at least 3 members", 400));
    }

    if (chat.creator.toString() === req.user.toString()) {
        const randomIndex = Math.floor(Math.random() * remainingMembers.length);
        const newCreator = remainingMembers[randomIndex];
        chat.creator = newCreator;
    }

    chat.members = remainingMembers;

    const [user] = await Promise.all([
        User.findById(req.user, "name"),
        chat.save()
    ]);

    emitEvent(req, ALERT, chat.members, `${user.name} has left the Group`);
    emitEvent(req, REFETCH_CHATS, chat.members);

    res.status(200).json({
        success: true,
        message: "Member left successfully"
    });
});

export const sendAttachment = TryCatched(async (req, res, next) => {
    const { chatId } = req.body;
    const files = req.files || [];
    console.log(files);
   
    console.log(chatId)

    if (files.length < 1) {
        return next(new ErrorHandler("Please Provide the attachment", 400));
    }
    
    if (files.length > 5) {
        return next(new ErrorHandler("File Can't be more than 5", 400));
    }
  
    const [chat, me] = await Promise.all([
        Chat.findById(chatId),
        User.findById(req.user._id, "firstName")
    ]);
  console.log(me)
    if (!chat) {
        return next(new ErrorHandler("Chat Not Found", 404));
    }
  
    const attachments = await uploadFileToCloudinary(files);
  
    const messageForDB = { 
        content: "", 
        attachments,
        sender: me._id,
        chat: chatId,
    };
  
    const messageForRealTime = {
        ...messageForDB,
        sender: {
            id: me._id,
            name: me.firstName,
        },
    };
  
    const message = await Message.create(messageForDB);
  
    emitEvent(req, NEW_MESSAGE, chat.members, { message: messageForRealTime, chatId });
    emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });
  
    res.status(200).json({
        success: true,
        message: "Attachment sent successfully",
        message,
    });
});

  

export const getDetailMessage=TryCatched(async(req,res,next)=>{
    if(req.query.populate==="true"){
        const chat=await Chat.findById(req.params.id)
        .populate("members","firstName lastName, avatar")
        .lean()

        if (!chat) {
            return next(new ErrorHandler("Chat Not Found", 404));
        }

        chat.members = chat.members.map(({_id,firstName,lastName,avatar})=>({
            _id,
            firstName,
            lastName,
            avatar:avatar[0]?.url
        }))

      

        res.status(200).json({
            success: true,
            chat
        });
    
    }else{

        const chat = await Chat.findById(req.params.id);

        if (!chat) {
            return next(new ErrorHandler("Chat Not Found", 404));
        }

        res.status(200).json({
            success: true,
            chat
        });
    }
})

export const renameGroup=TryCatched(async(req,res,next)=>{
    const chatId = req.params.id;

    const {name} = req.body;


    const chat = await Chat.findById(chatId);

    if (!chat) {
        return next(new ErrorHandler("Chat Not Found", 404));
    }

    if (!chat.groupChat) {
        return next(new ErrorHandler("This is not a group chat", 400));
    }
        

    if(chat.creator.toString() !== req.user?._id.toString()){
        return next(new ErrorHandler("You are not allowed to rename the group",403))
    }

    chat.name = name;

    chat.save()

    emitEvent(req,REFETCH_CHATS,chat.members)
      

    res.status(200).json({
        success: true,
        message:"Group Rename Successfully"
    });
    
    
})

export const deleteChat=TryCatched(async(req,res,next)=>{
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);

    if (!chat) {
        return next(new ErrorHandler("Chat Not Found", 404));
    }

    const members = chat.members;


    if (!chat.groupChat) {
        return next(new ErrorHandler("This is not a group chat", 400));
    }
        

    if(chat.groupChat && chat.creator.toString() !== req.user?._id.toString()){
        return next(new ErrorHandler("You are not allowed to delete the group",403))
    }

    if(!chat.groupChat && !chat.members.toString() !== req.user?._id.toString()){
        return next(new ErrorHandler("You are not allowed to delete the chat",403))
    }

    const messageWithAttachemnet=await Message.find({
        "chat":chatId,
        "attachments":{$exists:true,$ne:[]}
    })

    const public_ids=[]

    messageWithAttachemnet.forEach(({attachments})=>{
        attachments.forEach(({public_id})=>{
            public_ids.push(public_id)
        })
    })


    await Promise.all([
        deleteFileFromCloundry(public_ids),
        chat.deleteOne(),
        Message.deleteMany({"chat":chatId})
    ])

  

    

    emitEvent(req,REFETCH_CHATS,members)
      

    res.status(200).json({
        success: true,
        message:"Chat Deleted  Successfully"
    });
    
    
})

export const getMessage = TryCatched(async (req, res, next) => {
    const chatId = req.params.id;
    const { page = 1 } = req.body;

    const limitPerPage = 20;
    const skip = (page - 1) * limitPerPage;

    const [messages, totalMessageCount] = await Promise.all([
        Message.find({ chat: chatId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitPerPage)
            .populate("sender", "firstName lastName avatar")
            .lean(),
        Message.countDocuments({ chat: chatId })
    ]);

    const totalMessage = Math.ceil(totalMessageCount / limitPerPage);

    return res.status(200).json({
        success: true,
        messages: messages.reverse(),
        totalMessage
    });
});
import { faker, simpleFaker } from '@faker-js/faker'; 
import Chat from '../models/chatModel.js';
import User from '../models/userModel.js';
import Message from '../models/messageModel.js';

const createSingleChat = async (numberCount) => {
    try {
        const users = await User.find().select("_id");
        const chatsPromise = [];

        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) {
                chatsPromise.push(
                    Chat.create({
                        name: faker.lorem.words(2),
                        members: [users[i], users[j]]
                    })
                );
            }
        }

        await Promise.all(chatsPromise);
        console.log("Chat Created Successfully");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const createSingleGroup=async(numberChat)=>{
    try{

        const user = await User.find().select("_id");

        const chatsPromise=[];

        for(let i=0;i< numberChat;i++){
            const numMembers =simpleFaker.number.int({min:3,max:user.length});
            const members =[];

            for(let i=0;i<numMembers;i++){
                const randomIndex =Math.floor(Math.random()*user.length);
                const randomUser = user[randomIndex]

                 //Ensure the same user is not added twice

            if(!members.includes(randomUser)){
                members.push(randomUser)
            }
            }


            const chat =Chat.create({
                groupChat:true,
                name:faker.lorem.words(1),
                members,
                creator:members[0]
            })
    
            chatsPromise.push(chat);
    
        }
        await Promise.all(chatsPromise)

        console.log("Group Created Successfully")
        process.exit();

    }catch(error){
        console.error(error)
        process.exit(1);
    }
}
const createMessages = async (numberMessage) => {
    try {
        const users = await User.find().select("_id");
        const chats = await Chat.find().select("_id");
        const messagesPromise = [];

        for (let i = 0; i < numberMessage; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomChat = chats[Math.floor(Math.random() * chats.length)];

            messagesPromise.push(
                Message.create({
                    chat: randomChat,
                    sender: randomUser,
                    content: faker.lorem.sentence(),
                })
            );
        }

        await Promise.all(messagesPromise);
        console.log("Messages Created Successfully");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

const createMessagesInChat = async (chatId, numberMessage) => {
    try {
        const users = await User.find().select("_id");
        const messagesPromise = [];

        for (let i = 0; i < numberMessage; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];

            messagesPromise.push(
                Message.create({
                    chat: chatId,
                    sender: randomUser,
                    content: faker.lorem.sentence(),
                })
            );
        }

        await Promise.all(messagesPromise);
        console.log("Messages in Chat Created Successfully");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export { createSingleChat, createSingleGroup, createMessages, createMessagesInChat };

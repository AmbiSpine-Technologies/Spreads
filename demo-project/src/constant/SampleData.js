export const SampleData=[
    {
        _id:1,
        avatar:["https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"],
        name:"Dharmendra Kumar",
        groupChat:false,
        members:["1","2"]
    },
    {
        _id:2,
        avatar:["https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"],
        name:"Amit Kumar",
        groupChat:false,
        members:["1","2"]
    }
]


export const SampleUser=[{
    _id:1,
    avatar:["https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"],
    name:"Amit Kumar",
   
},
{
    _id:2,
    avatar:["https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"],
    name:"Dharmendra Kumar",
    
},
  ]

  
export const SampleNotification=[{
    _id:1,
   sender:{
    avatar:["https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"],
    name:"Amit Kumar",
   }
   
},
{
    _id:2,
    sender:{
        avatar:["https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"],
    name:"Dharmendra Kumar",
    }
    
},
  ]


export const SampleMessage=[{
    attachements:[{
        public_id:"adjjkkj",
        url:"https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
    }],
    content:"",
    _id:"ofdklirlrgee",
    sender:{
        _id:"user_id",
        name:"Dharmendra Kumar"
    },
    chat:"chatId",
    createAt:"2024-05-19T10:41:30.630Z"
},
{
    content:"Hii How are doing..? Nice and u..",
    _id:"ofdklirlrgee",
    sender:{
        _id:"fjkfklfg",
        name:"Amit"
    },
    chat:"chatId",
    createAt:"2024-05-19T10:41:30.630Z"
}
]

export const dashboardData={
    users:[
        {
            name:"Amit Raj",
            avatar:"https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg",
            _id:"1",
            username:"amitraj13",
            friends:30,
            groups:4
        },
        {
            name:"Dharmendra Raj",
            avatar:"https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg",
            _id:"1",
            username:"dharmendra1",
            friends:40,
            groups:8
        },
        { _id: "3", name: 'Jane Smith', avatar: '/path/to/avatar2.jpg', friends: 20, groups: 1, username: 'janesmith' },
        { _id: "4", name: 'Alice Johnson', avatar: '/path/to/avatar3.jpg', friends: 15, groups: 6, username: 'alicejohnson' },
    ],
    chats:[
        {
          _id: "1",
          name: 'John Doe',
          avatar: ['/path/to/avatar1.jpg'],
          content: 'Hello World',
          groupChat: false,
          members: ["1", "2"],
          totalMembers: 2,
          totalMessages: 20,
          creator: {
            name: "Adson",
            avatar: "/path/to/avatar1.jpg"
          },
          
        },
        {
          _id: "2",
          name: 'Jane Smith',
          avatar: ['/path/to/avatar2.jpg'],
          content: 'React is Awesome',
          groupChat: true,
          members: ["1", "2", "3"],
          totalMembers: 3,
          totalMessages: 30,
          creator: {
            name: "Emily",
            avatar: "/path/to/avatar2.jpg"
          },
          
        },
        {
          _id: "3",
          name: 'Alice Johnson',
          avatar: ['/path/to/avatar3.jpg'],
          content: 'JavaScript is great',
          groupChat: false,
          members: ["1"],
          totalMembers: 1,
          totalMessages: 10,
          creator: {
            name: "Michael",
            avatar: "/path/to/avatar3.jpg"
          },
         
        },
        {
          _id: "4",
          name: 'Bob Brown',
          avatar: ['/path/to/avatar4.jpg'],
          content: 'CSS is cool',
          groupChat: true,
          members: ["2", "3"],
          totalMembers: 2,
          totalMessages: 15,
          creator: {
            name: "Sarah",
            avatar: "/path/to/avatar4.jpg"
          },
         
        },
        {
          _id: "5",
          name: 'Charlie Davis',
          avatar: ['/path/to/avatar5.jpg'],
          content: 'HTML is the structure',
          groupChat: false,
          members: ["3"],
          totalMembers: 1,
          totalMessages: 5,
          creator: {
            name: "Laura",
            avatar: "/path/to/avatar5.jpg"
          },
         
        },
        {
          _id: "6",
          name: 'Eve White',
          avatar: ['/path/to/avatar6.jpg'],
          content: 'Python is powerful',
          groupChat: true,
          members: ["1", "2", "3", "4"],
          totalMembers: 4,
          totalMessages: 25,
          creator: {
            name: "John",
            avatar: "/path/to/avatar6.jpg"
          },
          
        },
      ],
      messages:[
        {
          "attachments": [
            {
              "public_id": "abcd1234",
              "url": "https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"
            }
          ],
          "content": "The weather is nice today!",
          "_id": "ofdklirlrgee1",
          "sender": {
            "_id": "user_id_1",
            "name": "Alice Johnson"
          },
          "chat": "chatId1",
          "createAt": "2024-05-19T10:41:30.630Z"
        },
        {
          "attachments": [
            {
              "public_id": "efgh5678",
              "url": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Astrophytum_asterias_03.jpg"
            }
          ],
          "content": "Check out this cool picture!",
          "_id": "ofdklirlrgee2",
          "sender": {
            "_id": "user_id_2",
            "name": "Bob Smith"
          },
          "chat": "chatId2",
          "createAt": "2024-05-20T11:15:22.345Z"
        },
        {
          "attachments": [
            {
              "public_id": "ijkl9012",
              "url": "https://upload.wikimedia.org/wikipedia/commons/4/48/Flower_in_Nanjing.jpg"
            }
          ],
          "content": "I just finished reading a great book.",
          "_id": "ofdklirlrgee3",
          "sender": {
            "_id": "user_id_3",
            "name": "Carol Lee"
          },
          "chat": "chatId3",
          "createAt": "2024-05-21T14:30:45.789Z"
        },
        {
          "attachments": [
            {
              "public_id": "mnop3456",
              "url": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Red_Rose.jpg"
            }
          ],
          "content": "Happy to be here!",
          "_id": "ofdklirlrgee4",
          "sender": {
            "_id": "user_id_4",
            "name": "David Green"
          },
          "chat": "chatId4",
          "createAt": "2024-05-22T09:05:00.123Z"
        }
      ]
      
}
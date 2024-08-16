import { body, validationResult,check,param } from "express-validator";


// Middleware to handle validation
const validatorHandler = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

// Validator function
const registerValidator = () => [
    body('name')
        .notEmpty().withMessage('Name is required.'),
    body('username')
        .notEmpty().withMessage('Username is required.'),
    body('password')
        .notEmpty().withMessage('Password is required.'),
    body('bio')
        .notEmpty().withMessage('Bio is required.'),
    check('avatar')
        .notEmpty().withMessage("Please upload avatar..?")
];

const loginValidator=()=>[
    body('username')
        .notEmpty().withMessage('Username is required.'),
    body('password')
        .notEmpty().withMessage('Password is required.'),
]

const newGroupValidator=()=>[
    body('name')
        .notEmpty().withMessage('Please  enter name'),
    body('members')
        .notEmpty().withMessage('Please  enter member...').isArray({"min":2,"max":100})
        .withMessage("Member must be 2-100"),
]

const addMemberValidator=()=>[
    body('chatId')
        .notEmpty().withMessage('Please  enter Chat ID'),
    body('members')
        .notEmpty().withMessage('Please  enter member...').isArray({"min":1,"max":97})
        .withMessage("Member must be 1-87"),
]
const removeMemberValidator=()=>[
    body('chatId')
        .notEmpty().withMessage('Please  enter Chat ID'),
        body('userId')
        .notEmpty().withMessage('Please  enter user ID'),
    
]

const sendAttachementValidator=()=>[
    body('chatId')
    .notEmpty().withMessage('Please  enter Chat ID'),
    check('files')
    .notEmpty().withMessage("Please upload attachement..?").isArray({"min":1,"max":5})
    .withMessage("attachement must be 1-5"),
]

const chatIdValidator=()=>[
    param('id')
    .notEmpty().withMessage('Please  enter Chat ID'),
]


const renameValidator=()=>[
    param('id')
    .notEmpty().withMessage('Please  enter Chat ID'),
    body('name')
    .notEmpty().withMessage('Please  enter rename'),
]

const sendFriendRequestValidator =()=> [
    body('userId').notEmpty().withMessage('Invalid user ID')
  ];

  const acceptFriendRequestValidator =()=> [
    body('requestId').notEmpty().withMessage('Invalid Request ID'),
    body('accept').notEmpty().withMessage("Please add accept").isBoolean().withMessage("Accept must be boolean")
  ];

  const adminLoginValidator = () => [
    body('secretKey').notEmpty().withMessage('Invalid secretKey ID')
  ];








export { registerValidator, validatorHandler ,
    loginValidator,
    newGroupValidator
    ,addMemberValidator,
    removeMemberValidator,
    sendAttachementValidator,
    chatIdValidator,renameValidator,
    sendFriendRequestValidator,
    acceptFriendRequestValidator,
    adminLoginValidator,
};

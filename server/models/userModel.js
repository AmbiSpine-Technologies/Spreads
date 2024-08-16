import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        min:2,
        max:50
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
        min:2,
        max:50
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        min:6,
        max:20
    },
    mobile: {
        type: Number,
        required: [true, 'Mobile Number is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        max:50
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min:6
    },
    termsAccepted: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: "",
        maxlength: 200
    },
    address: {
        type: String,
        default: ""
    },
    avatar: [
        { 
            public_id: {
                type: String,
                default:""
            },
            url: {
                type: String,
               default:""
            }
        }
    ],
    coverImage: [
        { 
            public_id: {
                type: String,
                default:""
            },
            url: {
                type: String,
               default:""
            }
        }
    ],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    friends:{
        type:Array,
        default:[]
    },
    bookmarks: {
        type:Array,
        default:[]
    },
    occupation:String,
    viewedProfile:Number,
    impressions:Number,
    notInterestedPosts: [{ type:Schema.Types.ObjectId, ref: 'Post' }],
    createdAt: {
        type: Date,
        default: Date.now
    }

},
{timestamps:true}
);

// Pre-save middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token method
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE
    });
};

//Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;

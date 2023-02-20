import mongoose from "mongoose";
const {Schema} = mongoose;

interface UserProps {
    name: string,
    lastname: string,
    email: string,
    password: string,
    avatar: string,
    admin: boolean,
    active: boolean,
    favorites: Array<string>,
    purchases: Array<string>,
    createdAt: string,
    updatedAt: string
}

const User = new Schema<UserProps>({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    admin: {
        type: Boolean,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    purchases: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String
    }
})

export default mongoose.model<UserProps>('User', User);
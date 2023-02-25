import mongoose, { Date, Document, Schema, Types, Model } from "mongoose";
import bcrypt from 'bcrypt'
import crypto from 'crypto'

interface UserProps {
    firstname: string,
    lastname: string,
    mobile: string,
    email: string,
    password: string,
    role: string,
    isBlocked: boolean,
    cart: Array<any> | undefined,
    address: string,
    wishlist: Array<Types.ObjectId>,
    refreshToken: string,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date | undefined
}

interface UserMethods {
    createPasswordResetToken(): Promise<string>,
    isPasswordMatched(password: string): Promise<boolean>
}

type UserModel = Model<UserProps, {}, UserMethods>;

// Declare the Schema of the Mongo model
const User = new mongoose.Schema<UserProps, UserModel, UserMethods>({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    cart: {
        type: Array,
        default: []
    },
    address: {
        type: String,
    },
    wishlist: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    refreshToken: {
        type: String
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
}, {
    timestamps: true
});

User.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

User.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

User.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest("hex")
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000
    return resetToken
}

//Export the model
export default mongoose.model<UserProps, UserModel>('User', User);
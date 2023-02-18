import mongoose from "mongoose";
const {Schema} = mongoose;

interface IToken {
    id: string,
    token: string
}

const TokenForgotPassword = new Schema<IToken>({
    id: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
});

export default mongoose.model<IToken>('TokenForgotPassword', TokenForgotPassword)
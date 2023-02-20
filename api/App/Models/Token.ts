import mongoose, { Schema, Types } from "mongoose";

interface TokenProps {
    userId: Types.ObjectId,
    token: string
}

const Token = new Schema<TokenProps>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    }
})

export default mongoose.model<TokenProps>('Token', Token)
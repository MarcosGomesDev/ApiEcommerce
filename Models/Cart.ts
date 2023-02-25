import mongoose, { Document, Schema, Types } from 'mongoose'

export interface ProductCartProps {
    product: Types.ObjectId,
    count: number,
    color: string,
    price: number
}

export interface CartProps extends Document {
    products: Array<ProductCartProps>,
    cartTotal: number,
    totalAfterDiscount: number,
    orderBy: Types.ObjectId
}

// Declare the Schema of the Mongo model
const Cart = new mongoose.Schema<CartProps>({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            count: Number,
            color: String,
            price: Number
        }
    ],
    cartTotal: {
        type: Number
    },
    totalAfterDiscount: {
        type: Number
    },
    orderBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

//Export the model
export default mongoose.model<CartProps>('Cart', Cart);
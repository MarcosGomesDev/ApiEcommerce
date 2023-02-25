import mongoose, { Schema } from 'mongoose'
import { ProductCartProps } from './Cart';

interface OrderProps {
    products: Array<ProductCartProps>
}

const Order = new mongoose.Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            count: Number,
            color: String
        }
    ],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
            "Not Processed",
            "Cash on Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered"
        ]
    },
    orderBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

//Export the model
export default mongoose.model('Order', Order);
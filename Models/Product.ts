import mongoose, { Schema } from "mongoose";


// Declare the Schema of the Mongo model
const Product = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
        required: true
    },
    ratings: [{
        star: Number,
        comment: String,
        postedby: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }],
    totalrating: {
        type: String,
        default: 0
    } 
}, {timestamps: true});

//Export the model
export default mongoose.model('Product', Product);
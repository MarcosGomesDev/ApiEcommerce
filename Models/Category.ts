import mongoose from 'mongoose'

const Category = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    }
}, {
    timestamps: true
});

export default mongoose.model('Category', Category);
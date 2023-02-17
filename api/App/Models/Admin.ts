import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

interface ISocial {
    instagram: string,
    facebook: string,
    whatsapp: string
}

interface IAdmin {
    name: string,
    lastname: string,
    storename: string,
    email: string,
    credential: string,
    password: string,
    avatar: string,
    admin: boolean,
    products: Array<Types.ObjectId>,
    socialMedias: Array<ISocial>,
    createdAt: string,
    updatedAt: string,
}

const Admin = new Schema<IAdmin>({
    name: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    storename: {
        required: true,
        type: String
    },
    credential: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    avatar: {
        type: String
    },
    admin: {
        required: true,
        type: Boolean
    },
    products: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
    socialMedias:[{
        instagram: {
            type: String
        },
        facebook: {
            type: String
        },
        whatsapp: {
            type: String
        }
    }],
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

export default mongoose.model<IAdmin>('Admin', Admin);
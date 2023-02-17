import mongoose from "mongoose";

const connect = async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log('db as connect');
}

export default connect
import mongoose from "mongoose";

const connectDB = async () => {
  
    mongoose.connection.on("connected", ()=>console.log("Database Connected"));
    

    await mongoose
    .connect(`${process.env.MONGODB_URI}`)
    // .then(() => {
    //   console.log("DB connected");
    // })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB
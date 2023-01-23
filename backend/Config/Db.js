import mongoose from "mongoose";
import color from "colors";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongo_URL);
    console.log(
      `MongoDB Connected:${conn.connection.host}`.blue.bold.underline.italic
    );
  } catch (error) {
    console.log(`Error:${error.messagge}`.red.underline.bold);
    process.exit(1);
  }
};
export default connectDB;

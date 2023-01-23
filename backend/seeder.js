import mongoose from "mongoose";
import dotenv from "dotenv";
import Color from "color";
import Users from "./Data/User.js";
import Products from "./Data/Products.js";
import User from "./Model/userModel.js";
import Product from "./Model/productModel.js";
import Order from "./Model/orderModel.js";
import connectDB from "./Config/Db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createUsers = await User.insertMany(Users);
    const adminUser = createUsers[0]._id;
    const sampleProducts = Products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("DataBase imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.blue.inverse);
    process.exit(1);
  }
};
const destroyData= async ()=>{
      try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        console.log('Data Destroy'.red.inverse);
        process.exit()
      } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
      }
}
if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}

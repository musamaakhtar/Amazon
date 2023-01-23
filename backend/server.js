// =======================Import Pakages= && Uses============================
import path from "path";
import express from "express";
import Color from "colors";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Config/Db.js";
import productRoutes from "./Routes/productRoutes.js";
import { notFound, errorHandler } from "./Middleware/errorMiddleware.js";
import userRoutes from "./Routes/userRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import uploadRoutes from "./Routes//uploadRoutes.js";
dotenv.config();
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

connectDB();
app.use(cors());
app.use(express.json());
// =======================API Calling======================================
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
// ===========================Access Folder In Server ==========================
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// =======================payment integrationn================================
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
// =======================API Calling=========================================
app.use(notFound);
app.use(errorHandler);
// =======================Server running======================================
const POORT = process.env.PORT;
app.listen(POORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${POORT}`.yellow
      .bold.underline.italic
  );
});
// =======================Server running======================================

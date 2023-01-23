import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";
import asynchandler from "express-async-handler";
const protect = asynchandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(decoded);
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized  Token Field");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("not Authorized token");
  }
  next();
});
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Admin");
  }
};

export { protect, admin };

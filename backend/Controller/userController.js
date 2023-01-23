import asyncHandle from "express-async-handler";
import User from "../Model/userModel.js";
import generateToken from "../utils/generateToken.js";

// ==========================User_Auth_Functions========================
const userAuth = asyncHandle(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email and password");
  }
});
// ==========================User_Auth_Functions========================
// ==========================User_Profile_Functions========================
const getUserProfile = asyncHandle(async (req, res) => {
  // const user = await User.findById(req.user._id);
  // console.log(req.user);
  // if (user) {
  //   res.json({
  //     _id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     isAdmin: user.isAdmin,
  //   });
  // } else {
  //   res.status(404);
  //   res.json({
  //     success: false,
  //     message: error,
  //   });
  //   // throw new Error("User Not Found");
  // }

  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
// ==========================User_Profile_Functions========================
// ==========================User_Register_Functions=======================

const registerUser = asyncHandle(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("You'r already exist");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid User Data");
  }
});
// ===============================================================
// ==========================User_Profile_Update==================
const updateUserProfile = asyncHandle(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not found");
  }
});
// ==========================Get_User==================

const getUser = asyncHandle(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
// ==========================Del User==================

const deleteUser = asyncHandle(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.send({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
// ==========================Get User==================
const getUserById = asyncHandle(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
// ==========================Get User==================
const updateUser = asyncHandle(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
// ==========================Get User==================
export {
  userAuth,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUser,
  deleteUser,
  getUserById,
  updateUser,
};

import { compareSync, hashSync } from "bcryptjs";
import User from "../models/User";
export const getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log(error);
  }

  if (!users) {
    return res.status(5000).json({ message: "Unexpexted error occur" });
  }

  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6
  ) {
    return res.send(422).json({ message: "Invalid data" });
  }

  const hashPassword = hashSync(password);

  let user;
  try {
    user = new User({ name: name, email: email, password: hashPassword });
    await user.save();
  } catch (error) {
    return console.log(error);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected erroe occured" });
  }

  return res.status(201).json({ user });
};

export const login = async (req, res, next) => {
    const {  email, password } = req.body;
  if (
    !email &&
    email.trim() === "" &&
    !password &&
    password.length < 6
  ) {
    return res.send(422).json({ message: "Invalid data" });
  }

  let existingUser;
  try {
    existingUser=await User.findOne({email})
  } catch (error) {
    return console.log(error)
  }

  if(!existingUser){
    return res.status(404).json({message:"No user found"})
  }

  const isPasswordCorrect=compareSync(password,existingUser.password);

  if(!existingUser){
    return res.status(400).json({message:"Incorrect password"})
  }

  return res.status(200).json({id:existingUser._id, message:"Login successful"})
};

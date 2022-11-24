import mongoose from "mongoose";
import Post from "../models/Post";
import User from "../models/User";

export const getAllPosts = async (req, res) => {
  let posts;
  try {
    posts = await Post.find();
  } catch (error) {
    return console.log(error);
  }

  if (!posts) {
    return res.status(500).json({ message: "unexpected error occur" });
  }

  return res.status(200).json({ posts });
};

export const addPost = async (req, res) => {
  const { title, description, image, location, date, user } = req.body;

  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date &&
    !user &&
    !image &&
    image.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid data" });
  }

  let existingUser;
  try {
    existingUser=await User.findById(user)
  } catch (error) {
    return console.log(error)
  }

  if(!existingUser){
    return res.status(404).json({message:"User not found"})
  }


  let post;
  try {
    post = new Post({
      title,
      description,
      image,
      date: new Date(`$${date}`),
      location,
      user,
    });
    // this step bsically done for to add single user for perticular post
    // and also add single post to user posts collection
    const session=await mongoose.startSession();
    session.startTransaction();
    existingUser.posts.push(post);
    await existingUser.save({session})
    post = await post.save({session});
    session.commitTransaction()

  } catch (error) {
    return console.log(error);
  }

  if (!post) {
    return res.status(500).json({ message: "unexpected error ocuur" });
  }

  return res.status(201).json({ post });
};

export const getPostById = async (req, res) => {
  const id = req.params.id;

  let post;
  try {
    post = await Post.findById(id);
  } catch (error) {
    return console.log(error);
  }

  if (!post) {
    return res.status(404).json({ message: "No post found" });
  }

  return res.status(200).json({ post });
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, description, image, location, date } = req.body;

  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !location &&
    location.trim() === "" &&
    !date &&
    !image &&
    image.trim() === ""
  ) {
    return res.status(422).json({ message: "invalid data" });
  }

  let post;
  try {
    post = await Post.findByIdAndUpdate(id, {
      title,
      description,
      image,
      date: new Date(`${date}`),
      location,
    });
  } catch (error) {
    return console.log(error);
  }

  if(!post){
    return res.status(500).json({message:"unable to upate"})
  }

  return res.status(200).json({message:"updated successfully"})
};

export const deletePost=async(req,res)=>{
    let id=req.params.id;
    
    let post;
    try {
        const session=await mongoose.startSession()
        session.startTransaction();
        post=await Post.findById(id).populate("user");
        console.log(post)
        post.user.posts.pull(post);
        await post.user.save({session})
        post=await Post.findByIdAndRemove(id);
        session.commitTransaction()
    } catch (error) {
        return console.log(error)
    }

    if(!post){
        return res.status(500).json({message:"unable to delete"})
    }

    return res.status(200).json({message:"Deleted successfully"})
}

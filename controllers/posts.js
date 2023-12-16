import postMessage from '../models/postMessage.js'
import mongoose from 'mongoose';



export const getPosts = async (req,res)=>{
try{
    const postMessages = await postMessage.find()
    res.status(200).json(postMessages)
}catch(error){
    res.status(404).json({message: error.message });
}
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await postMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req,res)=>{
const post = req.body
const newPost = new postMessage(post);
    try{
        await newPost.save()
        res.status(200).json(newPost)
    }catch(error){
        res.status(409).json({message: error.message });
    }
}

export const updatePost = async (req,res)=>{
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status.send(`No post with this id ${id}`)
    const postData = {creator,title, message,tags, selectedFile, _id:id };
    const updatedPost = await postMessage.findByIdAndUpdate(id , postData, { new : true });

    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await postMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await postMessage.findById(id);

    const updatedPost = await postMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}
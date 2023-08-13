const Post = require("../models/Post");
const User = require("../models/User");
const router=require("express").Router();

//CREATE post
router.post("/",async (req,res)=>{
    newpost= new Post(req.body);
    try{
        const savedPost= await newpost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
});
//UPDATE post
router.put("/:id",async (req,res)=>{
    try{

        const post= await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("The Post has been updated");
        }else{
            res.status(403).json("You can update only your own post");
        }
    }catch(err){
        res.status(500).json(err);
    }
});
//DELETE post
router.delete("/:id",async (req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.deleteOne();
            res.status(200).json("The Post has been deleted");
        }else{
            res.status(403).json("You can delete only your own post");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//LIKE/DISLIKE a post
router.put("/:id/like",async (req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("The Post has been liked");
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("The Post has been disliked");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//GET a post
router.get("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

// //GET users timeline
router.get("/timeline/:userId", async (req,res)=>{
try{
    const currentUser=await User.findById(req.params.userId);
    const userPosts=await Post.find({userId:currentUser._id});
    const friendPosts=await Promise.all(
        currentUser.following.map(async (friendId)=>{
            const post=await Post.find({userId:friendId})
            return post;
        })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
}catch(err){
    res.status(500).json(err);
}
});

//GET user's posts
router.get("/profile/:username", async (req,res)=>{
    try{
       const user=await User.findOne({username: req.params.username});
       const posts=await Post.find({userId:user._id});
       res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
    });
    

module.exports=router;
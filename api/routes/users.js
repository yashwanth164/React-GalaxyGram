const { status } = require("express/lib/response");
const User =require("../models/User");
const router=require("express").Router();
const bcrypt=require("bcrypt");

//UPDATE USER
router.put('/:id',async (req,res)=>{
    // try{
    // const user= await User.findOne({_id:req.body.userId});
    if(req.body.userId===req.params.id || req.user.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(req.body.password,salt);
            }
            catch(err){
                return res.status(500).json(err);
            }
        }    
        try{
            await User.findByIdAndUpdate(req.params.id,{$set:req.body});
            res.status(200).json("Account has been updated");       
        }
        catch(err){
            return res.status(500).json(err);
        }
    }else{
            return res.status(403).json("You can't update other account, can only updates your own account");
        }
    // }
    // catch(err){
    //     console.log("error is coming");
    //     return res.status(500).json(err);
    // }
});

//DELETE USER
router.delete('/:id',async (req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");       
        }
        catch(err){
            console.log("error block");
            return res.status(500).json(err);
        }
    }else{
            return res.status(403).json("You can only DELETE your own account");
        }
});

//GET User Details
router.get("/",async (req,res)=>{
    const userId=req.query.userId;
    const username=req.query.username;
    try{
        const user= userId ? await User.findById(userId) : await User.findOne({username:username}) ;
        const {password,createdAt, updatedAt, ...other}=user._doc;
        res.status(200).json(other);
    }
    catch(err){
        res.status(500).json(err);
    }
});



//GET Friends
router.get("/friends/:userId", async(req,res)=>{
    try{
        const user=await User.findById(req.params.userId);
        const friends=await Promise.all(
            user.following.map(friendId=>{
                return User.findById(friendId);
            })
        );
        let friendList=[];
        friends.map(friend=>{
            const {_id, username,profilePicture}=friend;
            friendList.push({_id,username,profilePicture});
        });
        res.status(200).json(friendList);
    }catch(err){
        res.status(500).json(err);
    }
})

//FOLLOW a User
router.put("/:id/follow",async (req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user= await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{following:req.params.id}});
                res.status(200).json("Successfully following the user");
            }else{
                res.status(403).json("You are already following this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can't follow yourself");
    }
});

//UNFOLLOW a User
router.put("/:id/unfollow",async (req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user= await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{following:req.params.id}});
                res.status(200).json("User has been unfollowed");
            }else{
                res.status(403).json("You don't follow this user");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You can't unfollow yourself");
    }
});


module.exports=router;
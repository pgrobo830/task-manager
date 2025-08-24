const User = require('../models/user');
const bcrypt = require('bcrypt');

//@desc     Get all users
//@route    GET /api/users
//@access   Private(admin)
const getUsers = async(req,res)=>{
    try{

    }
    catch(err){
        res.status(500).json({message:"Server error",error: err.message});
    }
}

//@desc     Get user by id
//@route    GET /api/user/:id
//@access   Private(admin)
const getUserById = async(req,res)=>{
     try{
        console.log( req.params.id);
        
        const user = await User.findOne({_id: req.params.id});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }   
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message:"Server error",error: err.message});
    }
}

//@desc     delete user by id only admin
//@route    DELETE /api/user/:id
//@access   Private(admin)
const deleteUser = async(req,res)=>{
     try{
        const user = await User.findOne({_id: req.params.id});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        // Check if the user is an admin
        if(user.role === 'admin'){
            return res.status(400).json({message: "Cannot delete an admin user"});
        }
        await User.deleteOne({_id: req.params.id});
        res.status(200).json({message: "User deleted successfully"});
    }
    catch(err){
        res.status(500).json({message:"Server error",error: err.message});
    }

}

module.exports = {getUsers, deleteUser, getUserById};
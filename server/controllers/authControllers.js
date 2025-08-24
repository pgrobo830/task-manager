const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//  Generate Web token 
const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
};

// @description:    Register a new user
// @`route:         POST /api/auth/register
// @access          Public
const registerUser = async (req, res) => {
    try{
        const { name, email, password,profileImageUrl} = req.body;
        //  check user is already registered ot not 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        else{
            //  Hash Password
            const salt  = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user  = await User.create({
                name,
                email,
                password:hashedPassword,
                profileImageUrl,
            });
            // Return user data and token
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role:user.role,
                profileImageUrl: user.profileImageUrl,
                token: generateToken(user._id)
            }
            )
        }
    }
    catch(err){
        res.status(500).json({message: 'Server error',error: err.message});
    }
};

// @desc           Login user
// @`route         POST /api/auth/login
// @access         Public
const loginUser = async(req, res)=> {
     try{
        const{email,password} = req.body;
        //  Check if user exists
        const user = await User.findOne({email});
        console.log(user.password)
        if(!user ){
            return res.status(400).json({message: 'Invalid email or password'});
        }
        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid email or password'});
        }
        else{
            res.status(200).json({
                _id: user._id,
                token: generateToken(user._id),
            });
        }
     }
    catch(err){
        res.status(500).json({message: 'Server error',error: err.message});
    }
};

// @desc          Get user profile
// @route        GET /api/auth/profile
// @access       Private(Required JWT)
const getUserProfile = async (req, res) => {
     try{
        console.log(req.user)
        const user = await User.findOne({_id: req.user._id}).select("-password");
        if(!user){
            res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl
        });

     }
    catch(err){
        res.status(500).json({message: 'Server error',error: err.message});
    }
}


// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private(Required JWT)

const updateUserProfile = async(req,res) =>{
     try{
        // const user = req.user; // Get user from auth middleware
        const user = await User.findById(req.user._id);
        if(!user){
            res.status(404).json({message: 'User not found'});
        }
        
            user.name = req.body.name || user.name,
            user.email= req.body.email || user.email,
            user.profileImageUrl =  req.body.profileImageUrl || user.profileImageUrl
               
            const salt = await bcrypt.genSalt(10);
            user.password = req.user.password ? bcrypt.hash(req.user.password,salt) :user.password; 
            user.role = req.body.role || user.role; // Allow role change if needed
            const updatedUser = await user.save();

            res.status(200).json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                profileImageUrl: updatedUser.profileImageUrl,
                token: generateToken(updatedUser._id) // Return new token
            });
        
     }
    catch(err){
        res.status(500).json({message: 'Server error',error: err.message});
    }
}

module.exports ={registerUser, loginUser, getUserProfile, updateUserProfile, generateToken};




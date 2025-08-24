const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
    try{
        let token = req.headers.authorization;
        console.log(token)
        if(token && token.startsWith("Bearer")){
            token = token.split(" ")[1]; // split token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token
            req.user = await User.findById(decoded.id).select("-password"); // find user
            next(); // proceed to next middleware or route handler

        }else{
            res.status(401).json({message: "Not authorized, no token"}); // if no token, return error

        }
    }catch(error){
        res.status(401).json({message: "Not authorized, token failed" ,error:error.message}); // if token verification fails, return error
    }
};

// Middleware for admin access
const adminMiddleware = (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next(); // if user is admin, proceed
    }else{
        res.status(403).json({message: "Access denied, admin only"}); // if not admin, return error
    }
};
module.exports = { authMiddleware, adminMiddleware };
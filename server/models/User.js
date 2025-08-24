const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    profileImageUrl: {type: String,default: "https://www.gravatar.com/avatar/"},
    role: {type: String,default: "user",enum: ["user","admin"]},// , Role based Access Control
},
{timestamps: true}
);
module.exports = mongoose.model("User",UserSchema);
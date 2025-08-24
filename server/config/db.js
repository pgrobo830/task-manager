const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/task-manager", {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true
        })
        console.log("MongoDB connected successfully");
    }catch(err){
        console.error(`DB error chromeError: ${err.message}`);
    }
}
module.exports = connectDB;
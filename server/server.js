const express  = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path')
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');  
const userRoutes = require('./routes/userRoutes');
dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.client_url || "*", // Adjust the origin as needed
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type,Authorization'],
    credentials: true // Allow credentials if needed
}))

// Connect to the database
connectDB();

// Middleware 
app.use(express.json());

// Routes
app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/users",userRoutes);

// Serve uploads folder
app.use("/upload", express.static(path.join(process.cwd(), "upload")));


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
const Task = require('../models/Task');

// @desc    Get all task (Admin:all User:only assigned Tasks)
// @routes  Get /api/tasks/
const getTasks = async(req,res) =>{
    try{

    }
    catch(err){
        res.status(500).json({message:"server error",error:err.message});
    }
}

// @desc    Get task by ID
// route    GET /api/tasks/:id
const getTaskById = async (req,res)=>{
     try{
        const task = await Task.findById(req.params.id).populate(
            "assignedTo","name email profileImageUrl")
        console.log(task);
        if(!task)
                return res.status(404).json({message:"task not found"});
        res.status(200).json({
            message:"task found",   
            task
        });
    }  
    catch(err){
        res.status(500).json({message:"server error",error:err.message});
    }
}

//@desc     create a new task(admin only) 
//@route    POST /api/tasks
const createTask =  async(req,res)=>{
     try{
        const {
            title,
            description,
            priority,
            dueDate,    
            assignedTo,
            todoCheckList,
            attachments
        } = req.body;
        if(!Array.isArray(assignedTo))
            return res.status(400).json({message:"assignedTo should be an array of user ID"});
        const createdTask =await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user._id, // Assuming req.user is populated with the authenticated user
            todoCheckList,
            attachments
            
        });              
         res.status(201).json({
            message:"task created successfully",
            task:createdTask
        })
    }
    catch(err){
        res.status(500).json({message:"server error",error:err.message});
    }
}

//@desc     update task details
//@route    api/user/task:/task-id
const updateTask =  async(req,res)=>{
     try{}
    catch(err){
        res.status(500).json({message:"server error",error:err.message});
    }
}


//@desc     delete task 
//@route    api/user/task:/task-id
const deleteTask =  async(req,res)=>{
     try{}
    catch(err){
        res.status(500).json({message:"server error",error:err.message});
    }
}

// @desc    Dashboard Data(admin only)
//@route    GET /api/tasks/dashboard-data
const getDashboardData = async(req,res)=>{
     try{}
    catch(err){
        res.status(500).json({message:"server error",error:err.message});
    }
}

// @desc    Dashboard Data(user-specific)
//@route    GET /api/tasks/dashboard-user-data
const getUserDashboardData = async(req,res)=>{
     try{}
    catch(err){
        res.status(500).json({message:"server error",error:err.message});
    }
}

//@desc     update task status 
//@route    PUT api/tasks/:id/status
const updateTaskStatus = async(req,res)=>{
     try{}
    catch(err){
        res.status(500).json({message:"server error",error:err.message});
    }
}

//@desc     update task checkList 
//@route    PUT api/tasks/:id/status
const updateTaskCheckList = async(req,res)=>{
     try{}
    catch(err){
        res.status(500).json({message:"server error",error:err.message});
    }
}


module.exports = {
    getDashboardData,
    getUserDashboardData,
    getTasks,getTaskById,
    createTask,updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskCheckList
};
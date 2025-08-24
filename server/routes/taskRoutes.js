const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const {getDashboardData,getUserDashboardData,getTasks,getTaskById,createTask,updateTask,deleteTask,updateTaskStatus,updateTaskCheckList} = require('../controllers/taskControllers')
const router = express.Router();




// api/user/
router.get("/dashboard-data",authMiddleware,getDashboardData);
router.get("/user-dashboard-data",authMiddleware,getUserDashboardData);
router.get("/",authMiddleware,getTasks);
router.get("/:id",authMiddleware,getTaskById);//get task by id
router.post("/",authMiddleware,adminMiddleware,createTask);// create task by ID
router.put("/:id",authMiddleware,updateTask);
router.delete("/:id",authMiddleware,deleteTask);// delete a task(Admin ONLY) -> use TaskMiddleware
router.get("/:id-status",authMiddleware,updateTaskStatus); // update task status
router.get("/:id/todo",authMiddleware,updateTaskStatus); // update task checklist 

module.exports = router;

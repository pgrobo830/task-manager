const express = require('express');
const { registerUser,loginUser,getUserProfile,updateUserProfile } = require('../controllers/authControllers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",authMiddleware ,getUserProfile);
router.put("/update-profile", authMiddleware,updateUserProfile);

module.exports = router;
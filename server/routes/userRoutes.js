const express  = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getUsers, deleteUser, getUserById } = require('../controllers/userControllers');
const router = express.Router();

router.get('/',authMiddleware, getUsers);
router.get('/:id',authMiddleware, getUserById);
router.delete('/:id',authMiddleware, deleteUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createUser, getUsers } = require('../controllers/userController');

// All routes require authentication
router.use(auth);

router.post('/', createUser);
router.get('/', getUsers);

module.exports = router;
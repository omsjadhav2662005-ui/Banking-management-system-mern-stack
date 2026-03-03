const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getDashboardSummary } = require('../controllers/dashboardController');

router.use(auth);
router.get('/summary', getDashboardSummary);

module.exports = router;
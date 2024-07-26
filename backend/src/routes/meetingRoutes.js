const express = require('express');
const meetingController = require('../controllers/meetingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/meetings', authMiddleware, meetingController.createMeeting);
router.get('/meetings', authMiddleware, meetingController.getMeetings);
router.put('/meetings/:id', authMiddleware, meetingController.updateMeeting);
router.delete('/meetings/:id', authMiddleware, meetingController.deleteMeeting);

module.exports = router;

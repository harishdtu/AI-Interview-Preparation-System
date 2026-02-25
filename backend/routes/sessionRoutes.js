const express = require('express');
const { createSession, getMySessions, getSessionById, deleteSession } = require('../controllers/sessionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();    

router.post('/create', protect, createSession); //Create a new session (protected route)
router.get('/my-sessions', protect, getMySessions); //Get all sessions for the authenticated user (protected route)
router.get('/:id', protect, getSessionById); //Get a specific session by ID (protected route)
router.delete('/:id', protect, deleteSession);

module.exports = router;
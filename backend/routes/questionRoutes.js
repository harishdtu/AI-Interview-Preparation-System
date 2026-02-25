const express = require('express');
const { togglePinQuestion, updateQuestionNote, addQuestionsToSession } = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', protect, addQuestionsToSession); //Add a question to a session (protected route)
router.post('/:id/pin', protect, togglePinQuestion); //Toggle question in session (protected route)
router.post('/:id/note', protect, updateQuestionNote); //Toggle note for a question in session (protected route)

module.exports = router;


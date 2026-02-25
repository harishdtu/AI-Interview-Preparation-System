const express = require("express");
const router = express.Router();
const {
  generateInterviewQuestions,
  generateConceptExplanation,
} = require("../controllers/aiController");

router.post("/generate-questions", generateInterviewQuestions);
router.post("/generate-explanation", generateConceptExplanation);

module.exports = router;
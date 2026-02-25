const Question = require('../models/Question');
const Session = require('../models/Session');

//@desc Add additional questions to an existing session
//@route POST /api/questions/add
//@access Private
exports.addQuestionsToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if(!sessionId || !questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: 'Invalid session ID or questions array' });

        }
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        //Create new questions
        const createdQuestions = await Question.insertMany(
            questions.map(q => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );

        //u[date session with new question IDs
        session.questions.push(...createdQuestions.map(q => q._id));
        await session.save();
        res.status(201).json({createdQuestions });
    } catch (error) {
        res.status(500).json({  message: 'Server error' });
    }
};

//@desc Toggle pin/unpin a question in a session
//@route POST /api/questions/:id/pin
//@access Private
//@desc Toggle pin/unpin a question in a session
//@route POST /api/questions/:id/pin
//@access Private
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({ question });

  } catch (error) {
    res.status(500).json({ message: "Failed to toggle pin" });
  }
};
//@desc Update note for a question in a session
//@route POST /api/questions/:id/note
//@access Private
exports.updateQuestionNote = async (req, res) => {
    try {
        const {note} = req.body;
        const question =  await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success:false,message: 'Question not found' });
        }

        question.note = note;
        await question.save();
        res.status(200).json({ success:true, question });
    } catch (error) {
        res.status(500).json({  message: 'Server error' });
    }
};  
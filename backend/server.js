require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const {protect} = require("./middlewares/authMiddleware");
 const {generateInterviewQuestions, generateConceptExplanation} = require("./controllers/aiController");

const app = express();

app.set("etag", false);
app.use(
    cors({
    origin: "https://ai-interview-preparation-system.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


connectDB();

//Middleware to parse JSON bodies
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

const aiRoutes = require("./routes/aiRoutes");

app.use("/api/ai", aiRoutes);

app.use("/api/generate-questions", protect, generateInterviewQuestions);
app.use("/api/generate-explanation", protect, generateConceptExplanation);

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});
//serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}));

app.get("/", (req, res) => {
  res.send("AI Interview Backend is Running 🚀");
});

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
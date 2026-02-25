//@desc Generate interview questions (Dummy Version)
//@route POST /api/ai/generate-questions

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, topicsToFocus } = req.body;

    if (!role || !topicsToFocus) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const topics = topicsToFocus.split(",");

    const questions = topics.map((topicRaw) => {
      const topic = topicRaw.trim();

      return {
        question: `Explain ${topic} in the context of ${role}.`,
        answer: `
## ${topic}

${topic} is a fundamental technology used in ${role} development.

### 🔹 What is ${topic}?

${topic} helps developers build scalable and maintainable applications.

### 🔹 Why is it important for ${role}?

- Enables structured development
- Improves performance
- Enhances maintainability
- Widely used in modern production systems

### 🔹 Example:

\`\`\`javascript
// Simple ${topic} example
console.log("Understanding ${topic}");
\`\`\`

### 🔹 Interview Tip

When explaining ${topic}:
1. Define it clearly  
2. Mention real-world usage  
3. Give a small example  
4. Talk about advantages  

Understanding ${topic} strengthens your fundamentals as a ${role}.
`
      };
    });

    res.status(200).json(questions);

  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ message: "Failed to generate questions" });
  }
};


//@desc Generate explanation (Dummy Version)
//@route POST /api/ai/generate-explanation

//@desc Generate explanation (Advanced Dummy GPT Style)
//@route POST /api/ai/generate-explanation

const generateConceptExplanation = async (req, res) => {
  try {
    const { concept } = req.body;

    if (!concept) {
      return res.status(400).json({ message: "Concept is required" });
    }

    const topic = concept.toLowerCase();

    let explanation = "";

    // =============================
    // HTML
    // =============================
    if (topic.includes("html")) {
      explanation = `
# HTML (HyperText Markup Language)

HTML is the standard markup language used to structure content on the web.

---

## 🔹 Core Understanding

In a Full Stack Developer context:

- Defines the structure of web pages
- Works with CSS for styling
- Connects with JavaScript for interactivity
- Acts as the foundation of frontend architecture

---

## 🔹 Practical Example

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Sample Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
\`\`\`

---

## 🔹 Why It Matters

Without HTML, there is no structure for web applications.  
It forms the base layer of the frontend stack.

---

## 🔹 Interview Tip 💡

Explain:
1. What HTML is
2. Semantic elements
3. DOM relationship
4. How it integrates with CSS & JS
`;
    }

    // =============================
    // React
    // =============================
    else if (topic.includes("react")) {
      explanation = `
# React.js

React is a JavaScript library used for building fast and scalable user interfaces.

---

## 🔹 Core Understanding

In Full Stack development:

- Builds dynamic frontend applications
- Uses component-based architecture
- Improves performance using Virtual DOM
- Promotes reusable UI components

---

## 🔹 Key Concepts

- Components
- Props & State
- Hooks (useState, useEffect)
- Virtual DOM
- JSX

---

## 🔹 Practical Example

\`\`\`javascript
import React from "react";

function App() {
  return <h1>Hello React</h1>;
}

export default App;
\`\`\`

---

## 🔹 Why It Matters

React improves frontend performance and maintainability in large applications.

---

## 🔹 Interview Tip 💡

Be ready to explain:
- Virtual DOM
- Lifecycle methods
- Functional vs Class components
- Why React is better than vanilla JS
`;
    }

    // =============================
    // Node.js
    // =============================
    else if (topic.includes("node")) {
      explanation = `
# Node.js

Node.js is a runtime environment that allows JavaScript to run on the server.

---

## 🔹 Core Understanding

For Full Stack Developers:

- Handles backend logic
- Builds REST APIs
- Manages authentication
- Connects to databases

---

## 🔹 Key Features

- Event-driven architecture
- Non-blocking I/O
- Single-threaded but highly scalable

---

## 🔹 Practical Example

\`\`\`javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Node.js");
});

app.listen(3000);
\`\`\`

---

## 🔹 Why It Matters

Node enables JavaScript across the entire stack — frontend + backend.

---

## 🔹 Interview Tip 💡

Understand:
- Event loop
- Middleware
- Asynchronous programming
- REST API design
`;
    }

    // =============================
    // MongoDB
    // =============================
    else if (topic.includes("mongo")) {
      explanation = `
# MongoDB

MongoDB is a NoSQL document-based database.

---

## 🔹 Core Understanding

In Full Stack Development:

- Stores data in JSON-like format
- Flexible schema design
- Scales horizontally

---

## 🔹 Key Features

- Document-based storage
- High performance
- Easy integration with Node.js

---

## 🔹 Example (Mongoose Schema)

\`\`\`javascript
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

module.exports = mongoose.model("User", UserSchema);
\`\`\`

---

## 🔹 Why It Matters

MongoDB is ideal for scalable web applications and modern APIs.

---

## 🔹 Interview Tip 💡

Know:
- Difference between SQL & NoSQL
- Indexing
- Aggregation pipeline
- Schema design
`;
    }

    // =============================
    // Default Fallback
    // =============================
    else {
      explanation = `
# ${concept}

${concept} is an important concept in software development.

---

## 🔹 Core Understanding

- Improves scalability
- Enhances maintainability
- Frequently asked in interviews

---

## 🔹 Practical Example

\`\`\`javascript
console.log("${concept} example");
\`\`\`

---

## 🔹 Interview Tip 💡

Explain definition, use cases, advantages, and real-world examples.
`;
    }

    res.status(200).json({ explanation });

  } catch (error) {
    console.error("Explanation ERROR:", error);
    res.status(500).json({ message: "Failed to generate explanation" });
  }
};
module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
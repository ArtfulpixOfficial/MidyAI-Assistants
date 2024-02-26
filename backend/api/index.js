require("dotenv").config();
const lodash = require("lodash");
const express = require("express");
const cors = require("cors");
const app = express();
const OpenAI = require("openai");
const port = process.env.PORT || 3001;
const openai = new OpenAI();
app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.get("/api/status", (req, res) => {
  res.send("MidyAI Assistant is Live, U can send Get and Post Requests. Happy Assistant production");
});
// Getting Assistants list
app.get("/api/assistants", async (req, res) => {
  const myAssistants = await openai.beta.assistants.list({
    order: "desc",
    limit: "50",
  });

  const assistantsData = myAssistants.data.map((assistant, i) => {
    return {
      id: assistant.id,
      name: assistant.name.split(" - ")[0],
      description: assistant.name.split(" - ")[1],
      image: `https://i.pravatar.cc/300?img=${i + 1}`,
    };
  });

  res.json(assistantsData);
});

async function checkCurrentRunStatus(threadId, runId) {
  let runStatus;
  while (true) {
    // Retrieve the task status
    const status = await openai.beta.threads.runs.retrieve(threadId, runId);
    runStatus = status.status;

    // Check if the task is completed
    if (runStatus === "completed") {
      return runStatus;
    }

    // Wait for 3 seconds before checking again
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}

async function chatProcess(threadId, assistantId) {
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });
  await checkCurrentRunStatus(threadId, run.id);
  const messages = await openai.beta.threads.messages.list(threadId);
  return messages;
}
app.post("/api/newchat", async (req, res) => {
  const thread = await openai.beta.threads.create();
  const messages = await chatProcess(thread.id, req.body.assistantId);
  res.json({ threadId: thread.id, chatContent: messages.data });
});

app.post("/api/newMessage", async (req, res) => {
  try {
    await openai.beta.threads.messages.create(req.body.threadId, {
      role: "user",
      content: req.body.content,
    });
    const messages = await chatProcess(req.body.threadId, req.body.assistantId);
    res.json({
      threadId: req.body.threadId,
      chatContent: messages.data,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

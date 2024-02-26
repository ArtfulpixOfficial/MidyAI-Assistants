import { useState } from "react";
import "./App.css";
import AssistantPage from "./AssistantPage";
import Assistants from "./Assistants";
import Navbar from "./Navbar";
import Loader from "./Loader";
import { RotatingLines } from "react-loader-spinner";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeAssistant, setActiveAssistant] = useState(null);
  const [threadId, setThreadId] = useState(null);
  const [activeAssistantChatContent, setActiveAssistantChatContent] = useState([
    {
      content: [
        {
          type: "loading",
          text: { value: <Loader />, annotations: [] },
        },
      ],
      role: "assistant",
    },
  ]);

  const handleClick = function (assistantObj) {
    setActiveAssistant(assistantObj);
  };

  const resetActiveAssistant = function () {
    setActiveAssistant(null);
    setThreadId(null);
    setActiveAssistantChatContent([
      {
        content: [
          { type: "loading", text: { value: <Loader />, annotations: [] } },
        ],
        role: "assistant",
      },
    ]);
  };

  return (
    <div className="App">
      <Navbar reset={resetActiveAssistant} activeAssistant={activeAssistant} />
      {isLoading && (
        <div className="loader-element">
          <RotatingLines strokeColor="#fff" />
        </div>
      )}
      {activeAssistant ? (
        <AssistantPage
          assistantData={activeAssistant}
          key={activeAssistant.id}
          threadId={threadId}
          setThreadId={setThreadId}
          activeAssistantChatContent={activeAssistantChatContent}
          setActiveAssistantChatContent={setActiveAssistantChatContent}
        />
      ) : (
        <Assistants handleClick={handleClick} setIsLoading={setIsLoading} />
      )}
    </div>
  );
}

export default App;

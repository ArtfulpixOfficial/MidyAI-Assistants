import { createContext, useContext, useState } from "react";
import Loader from "./Loader";
const AssistantsContext = createContext({
  isLoading: false,
  activeAssistant: null,
  threadId: null,
  activeAssistantChatContent: [],
  assistantsList: [],
  prompt: "",
});

const AssistantsProvider = function ({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [assistantsList, setAssistantsList] = useState([]);
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
  const [prompt, setPrompt] = useState("");
  return (
    <AssistantsContext.Provider
      value={{
        isLoading,
        setIsLoading,
        assistantsList,
        setAssistantsList,
        activeAssistant,
        setActiveAssistant,
        threadId,
        setThreadId,
        activeAssistantChatContent,
        setActiveAssistantChatContent,
        prompt,
        setPrompt,
      }}
    >
      {children}
    </AssistantsContext.Provider>
  );
};

const useAssistantsContext = () => {
  const {
    isLoading,
    setIsLoading,
    assistantsList,
    setAssistantsList,
    activeAssistant,
    setActiveAssistant,
    threadId,
    setThreadId,
    activeAssistantChatContent,
    setActiveAssistantChatContent,
    prompt,
    setPrompt,
  } = useContext(AssistantsContext);
  return {
    isLoading,
    setIsLoading,
    assistantsList,
    setAssistantsList,
    activeAssistant,
    setActiveAssistant,
    threadId,
    setThreadId,
    activeAssistantChatContent,
    setActiveAssistantChatContent,
    prompt,
    setPrompt,
  };
};

export { AssistantsProvider, useAssistantsContext };

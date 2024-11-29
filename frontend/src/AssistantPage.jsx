import { useEffect } from "react";
import ChatContainer from "./ChatContainer";
import TypingContainer from "./TypingContainer";
import { useParams } from "react-router-dom";
import { startNewChat, getAssistantData } from "./api";
import { useAssistantsContext } from "./AssistantsProvider";
import Loader from "./Loader";
import Navbar from "./Navbar";
import { RotatingLines } from "react-loader-spinner";
export default function AssistantPage() {
  const {
    activeAssistant,
    setThreadId,
    setActiveAssistantChatContent,
    setActiveAssistant,
  } = useAssistantsContext();
  const { id } = useParams();
  useEffect(() => {
    async function getAssistantInfo() {
      const assistantData = await getAssistantData(id);
      console.log(assistantData);
      setActiveAssistant({
        id,
        name: assistantData.name.split(" - ")[0],
        description: assistantData.name.split(" - ")[1],
        image: `/${assistantData.name.split(" - ")[0]}.jpg`,
      });
    }
    getAssistantInfo();
  }, [id, setActiveAssistant]);
  useEffect(() => {
    if (activeAssistant) {
      console.log(activeAssistant);
      document.title = `${activeAssistant.name} - ${activeAssistant.description}`;
    }
    return () => (document.title = "MidyAI Assistants");
  }, [activeAssistant]);

  useEffect(() => {
    if (id) {
      async function startConversation() {
        const conversationData = await startNewChat(id);
        setThreadId(conversationData.threadId);
        setActiveAssistantChatContent(conversationData.chatContent);
      }
      startConversation();
    }
  }, [id, setThreadId, setActiveAssistantChatContent]);

  return (
    <div className="App">
      {!activeAssistant ? (
        <div className="loader-element">
          <RotatingLines strokeColor="#fff" />
        </div>
      ) : (
        <>
          <Navbar />
          <ChatContainer />
          <TypingContainer />
        </>
      )}
    </div>
  );
}

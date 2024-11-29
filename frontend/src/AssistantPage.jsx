import { useEffect } from "react";
import ChatContainer from "./ChatContainer";
import TypingContainer from "./TypingContainer";

import { startNewChat } from "./api";
import { useAssistantsContext } from "./AssistantsProvider";
export default function AssistantPage() {
  const { activeAssistant, setThreadId, setActiveAssistantChatContent } =
    useAssistantsContext();

  useEffect(() => {
    document.title = `${activeAssistant.name} - ${activeAssistant.description}`;
    return () => (document.title = "MidyAI Assistants");
  }, [activeAssistant]);

  useEffect(() => {
    async function startConversation() {
      const conversationData = await startNewChat(activeAssistant.id);
      setThreadId(conversationData.threadId);
      setActiveAssistantChatContent(conversationData.chatContent);
    }
    startConversation();
  }, [activeAssistant, setThreadId, setActiveAssistantChatContent]);

  return (
    <>
      <ChatContainer />
      <TypingContainer />
    </>
  );
}

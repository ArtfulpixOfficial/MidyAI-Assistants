import { useEffect, useState } from "react";
import ChatContainer from "./ChatContainer";
import TypingContainer from "./TypingContainer";
import Loader from "./Loader";
export default function AssistantPage({
  assistantData,
  threadId,
  setThreadId,
  activeAssistantChatContent,
  setActiveAssistantChatContent,
}) {
  const [prompt, setPrompt] = useState("");
  useEffect(() => {
    document.title = `${assistantData.name} - ${assistantData.description}`;
    return () => (document.title = "MidyAI Assistants");
  }, [assistantData]);

  useEffect(() => {
    async function startConversation() {
      const conversationData = await (
        await fetch(`https://midy-ai-assistants.vercel.app/api/newchat`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ assistantId: assistantData.id }),
        })
      ).json();
      setThreadId(conversationData.threadId);
      setActiveAssistantChatContent(conversationData.chatContent);
    }
    startConversation();
  }, [assistantData, setThreadId, setActiveAssistantChatContent]);

  const getResponse = async function (prompt) {
    setActiveAssistantChatContent((v) => [
      ...v,
      {
        content: [
          { type: "loading", text: { value: <Loader />, annotations: [] } },
        ],
        role: "assistant",
      },
    ]);
    const conversationData = await (
      await fetch(`https://midy-ai-assistants.vercel.app/api/newMessage`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          threadId: threadId,
          content: prompt,
          assistantId: assistantData.id,
        }),
      })
    ).json();
    setActiveAssistantChatContent(conversationData.chatContent.reverse());
  };

  const handleClick = function () {
    const currentPrompt = prompt.trim();
    setPrompt("");
    setActiveAssistantChatContent((v) => [
      ...v,
      {
        content: [
          { type: "text", text: { value: currentPrompt, annotations: [] } },
        ],
        role: "user",
      },
    ]);

    getResponse(currentPrompt);
  };

  return (
    <>
      <ChatContainer
        activeAssistantChatContent={activeAssistantChatContent}
        assistantData={assistantData}
      />
      <TypingContainer
        prompt={prompt}
        setPrompt={setPrompt}
        handleClick={handleClick}
      />
    </>
  );
}

import { useAssistantsContext } from "./AssistantsProvider";
import { getConversationData } from "./api";
import Loader from "./Loader";
export default function TypingContainer() {
  const {
    prompt,
    setPrompt,
    setActiveAssistantChatContent,
    threadId,
    activeAssistant,
  } = useAssistantsContext();

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
    const conversationData = await getConversationData(
      threadId,
      prompt,
      activeAssistant.id
    );
    setActiveAssistantChatContent(conversationData.chatContent.reverse());
  };

  const handleSendClick = function () {
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
    <div className="typing-container">
      <div className="typing-content">
        <div className="typing-textarea">
          <textarea
            id="chat-input"
            spellCheck="false"
            placeholder="Enter a prompt here"
            value={prompt}
            required
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <span
            id="send-btn"
            className="material-symbols-rounded"
            onClick={handleSendClick}
          >
            send
          </span>
        </div>
      </div>
    </div>
  );
}

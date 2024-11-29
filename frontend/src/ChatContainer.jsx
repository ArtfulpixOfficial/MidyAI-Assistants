import ChatElement from "./ChatElement";
import { useAssistantsContext } from "./AssistantsProvider";
export default function ChatContainer() {
  const { activeAssistantChatContent } = useAssistantsContext();
  return (
    <div className="chat-container">
      {activeAssistantChatContent.map((el, i) => (
        <ChatElement key={i} data={el.content} role={el.role} />
      ))}
    </div>
  );
}

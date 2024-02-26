import ChatElement from "./ChatElement";
export default function ChatContainer({
  activeAssistantChatContent,
  assistantData,
}) {
  return (
    <div className="chat-container">
      {activeAssistantChatContent.map((el, i) => (
        <ChatElement
          key={i}
          data={el.content}
          assistantData={assistantData}
          role={el.role}
        />
      ))}
    </div>
  );
}

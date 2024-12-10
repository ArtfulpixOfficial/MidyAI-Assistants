import { useAssistantsContext } from "./AssistantsProvider";
const ChatElement = function ({ data, role }) {
  const { activeAssistant } = useAssistantsContext();
  // console.log(assistantData);
  return (
    <div className={`chat ${role === "assistant" ? "incoming" : "outgoing"}`}>
      <div className="chat-content">
        <div className="chat-details">
          <img
            src={
              role === "assistant" ? activeAssistant.image : `/logo_dark.png`
            }
            alt="user-img"
          />
          <div className="content">
            <h4>{role === "assistant" ? activeAssistant.name : "You"}</h4>
            {data.map((el) =>
              el.type === "text" ? (
                <p key={Date.now()}>{el[el.type].value}</p>
              ) : (
                <div key={Date.now()}>{el.text.value}</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatElement;

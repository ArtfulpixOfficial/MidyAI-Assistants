const ChatElement = function ({ data, assistantData, role }) {
  return (
    <div className={`chat ${role === "assistant" ? "incoming" : "outgoing"}`}>
      <div className="chat-content">
        <div className="chat-details">
          <img
            src={role === "assistant" ? assistantData.image : `logo.png`}
            alt="user-img"
          />
          <div className="content">
            <h4>{role === "assistant" ? assistantData.name : "You"}</h4>
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

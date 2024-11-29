import { useAssistantsContext } from "./AssistantsProvider";
import Loader from "./Loader";
export default function Navbar() {
  const {
    setActiveAssistant,
    setThreadId,
    setActiveAssistantChatContent,
    activeAssistant,
  } = useAssistantsContext();
  const reset = function () {
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
    <nav className={`navbar ${activeAssistant ? "assistant-navbar" : ""}`}>
      {activeAssistant ? (
        <>
          <span className="reset-btn" onClick={reset}>
            {`< Back`}
          </span>
          <span className="assistant-details">
            <img src={activeAssistant.image} alt="midyAI-logo" />
            <h4>{activeAssistant.name}</h4>
            <p>
              &nbsp;
              {" - "} {activeAssistant.description}
            </p>
          </span>
        </>
      ) : (
        <>
          <img src="logo_dark.png" alt="midyAI-logo" />
          <h1>MidyAI Assistants</h1>
        </>
      )}
    </nav>
  );
}

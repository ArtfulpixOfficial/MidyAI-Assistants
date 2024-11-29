import { useAssistantsContext } from "./AssistantsProvider";
import Loader from "./Loader";
import { Link } from "react-router-dom";
export default function Navbar() {
  const {
    setActiveAssistant,
    setThreadId,
    setActiveAssistantChatContent,
    activeAssistant,
    setAssistantsList,
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
    setAssistantsList([]);
  };
  return (
    <nav className={`navbar ${activeAssistant ? "assistant-navbar" : ""}`}>
      {activeAssistant ? (
        <>
          <Link
            to="/"
            style={{
              display: "flex",
              textDecoration: "none",
            }}
          >
            <span className="reset-btn" onClick={reset}>
              {`< Back`}
            </span>
          </Link>
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
          <img src="logo-new.png" alt="midyAI-logo" />
          <h1>MidyAI Assistants</h1>
        </>
      )}
    </nav>
  );
}

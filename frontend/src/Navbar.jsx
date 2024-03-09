export default function Navbar({ activeAssistant, reset, isDarkMode }) {
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
          <img
            src={isDarkMode ? "logo_dark.png" : "logo_light.svg"}
            alt="midyAI-logo"
          />
          <h1>MidyAI Assistants</h1>
        </>
      )}
    </nav>
  );
}

export default function TypingContainer({
  prompt,
  setPrompt,
  handleClick,
  setIsDarkMode,
  isDarkMode,
}) {
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
            onClick={handleClick}
          >
            send
          </span>
        </div>
        <div className="typing-controls">
          <span
            id="theme-btn"
            className="material-symbols-rounded"
            onClick={() => setIsDarkMode((prevMode) => !prevMode)}
          >
            {isDarkMode ? "dark_mode" : "light_mode"}
          </span>
        </div>
      </div>
    </div>
  );
}

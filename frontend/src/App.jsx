import "./App.css";
import AssistantPage from "./AssistantPage";
import Assistants from "./Assistants";
import Navbar from "./Navbar";

import { RotatingLines } from "react-loader-spinner";
import { useAssistantsContext } from "./AssistantsProvider";

function App() {
  const { isLoading, activeAssistant } = useAssistantsContext();

  return (
    <div className={`App`}>
      <Navbar />
      {isLoading && (
        <div className="loader-element">
          <RotatingLines strokeColor="#fff" />
        </div>
      )}
      <Assistants />
      {/* {activeAssistant ? (
        <AssistantPage key={activeAssistant.id} />
      ) : (
        <Assistants />
      )} */}
    </div>
  );
}

export default App;

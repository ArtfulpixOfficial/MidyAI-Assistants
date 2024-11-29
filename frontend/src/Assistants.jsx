import { useEffect } from "react";
import Assistant from "./Assistant";
import { getAssistantsList } from "./api";
import { useAssistantsContext } from "./AssistantsProvider";
import { Link } from "react-router-dom";
export default function Assistants() {
  const { setIsLoading, setAssistantsList, assistantsList } =
    useAssistantsContext();
  // const [assistantsList, setAssistantsList] = useState([]);

  useEffect(() => {
    async function getAssistants() {
      setIsLoading(true);
      const list = await getAssistantsList();
      setIsLoading(false);
      setAssistantsList(list);
    }

    getAssistants();
  }, [setIsLoading, setAssistantsList]);

  return (
    <div className="assistants-list">
      {assistantsList.map((assistant) => (
        <Link
          to={`assistant/${assistant.id}`}
          key={assistant.id}
          className="assistantLinkClass"
        >
          <Assistant assistantObj={assistant} />
        </Link>
      ))}
    </div>
  );
}

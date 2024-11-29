import { useAssistantsContext } from "./AssistantsProvider";
export default function Assistant({ assistantObj }) {
  const { setActiveAssistant } = useAssistantsContext();
  const handleClick = function (assistantObj) {
    console.log(assistantObj);
    setActiveAssistant(assistantObj);
  };
  return (
    <div
      className={`assistant ${assistantObj.name === "Midy" ? "midy" : ""}`}
      onClick={() => handleClick(assistantObj)}
    >
      <img src={assistantObj.image} alt={assistantObj.name} />
      <h4>{assistantObj.name}</h4>
      <p>{assistantObj.description}</p>
    </div>
  );
}

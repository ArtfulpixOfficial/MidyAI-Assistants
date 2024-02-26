export default function Assistant({ assistantObj, handleClick }) {
  return (
    <div className="assistant" onClick={() => handleClick(assistantObj)}>
      <img src={assistantObj.image} alt={assistantObj.name} />
      <h4>{assistantObj.name}</h4>
      <p>{assistantObj.description}</p>
    </div>
  );
}

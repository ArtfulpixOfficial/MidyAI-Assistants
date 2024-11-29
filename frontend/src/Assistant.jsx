export default function Assistant({ assistantObj }) {
  return (
    <div className={`assistant ${assistantObj.name === "Midy" ? "midy" : ""}`}>
      <img src={`/${assistantObj.image}`} alt={assistantObj.name} />
      <h4
        style={{
          textDecoration: "none",
        }}
      >
        {assistantObj.name}
      </h4>
      <p>{assistantObj.description}</p>
    </div>
  );
}

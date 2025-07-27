const Message = ({ sender, text }) => {
    const lines = text.split("\n").filter(Boolean); // Avoid empty lines
  
    return (
      <div
        style={{
          backgroundColor: sender === "user" ? "#E5E7EB" : "#DCFCE7",
          textAlign: sender === "user" ? "right" : "left",
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "6px",
          whiteSpace: "pre-wrap", // <- preserves line breaks!
        }}
      >
        {lines.map((line, idx) => (
          <p key={idx} style={{ margin: "4px 0" }}>
            {line}
          </p>
        ))}
      </div>
    );
  };
  
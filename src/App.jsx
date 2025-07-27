import ChatBox from "./components/ChatBox";

function App() {
  return (
    <div
      style={{
        width: "50vw",
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <ChatBox />
    </div>
  );
}

export default App;

import { useState } from "react";
import axios from "axios";
import { marked } from "marked";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-8b-8192",
          messages: newMessages.map(({ sender, text }) => ({
            role: sender === "user" ? "user" : "assistant",
            content: text,
          })),
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
        }
      );

      const aiReply = response.data.choices[0].message.content;
      setMessages([...newMessages, { sender: "ai", text: marked(aiReply) }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "ai", text: marked("**Error:** Something went wrong.") },
      ]);
      console.error(error);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      style={{
        width: "50vw",
        height: "100%",
       
        backgroundColor: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "20px",
          paddingRight: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: "12px",
              padding: "10px 14px",
              borderRadius: "10px",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#4f46e5" : "#ffffff",
              color: msg.sender === "user" ? "#ffffff" : "#111827",
              maxWidth: "75%",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
            }}
          >
            {msg.sender === "ai" ? (
              <div
                dangerouslySetInnerHTML={{ __html: msg.text }}
                style={{ fontSize: "15px", lineHeight: "1.5" }}
              />
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask anything..."
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: "8px 0 0 8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "12px 20px",
            backgroundColor: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "0 8px 8px 0",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Send 🚀
        </button>
      </div>
    </div>
  );
};

export default ChatBox;

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const SERVER_URL = "http://localhost:8080"; // NestJS 서버의 URL과 포트

function ChatClient() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 소켓 연결 설정
  useEffect(() => {
    const newSocket = io(SERVER_URL, { transports: ["websocket"] });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [setSocket]);

  // 메시지 수신 리스너 설정
  useEffect(() => {
    if (!socket) return;

    socket.on("chat", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  // 메시지 전송 핸들러
  const sendMessage = () => {
    if (socket) {
      socket.emit("chat", { author: "User", body: input });
      setInput("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>
            {message.author}: {message.body}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatClient;

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ConnectionForm from "../components/ConnectionForm";
import { MessageList } from "./MessageList";
import { RoomList } from "./RoomList";

const SERVER_URL = "http://localhost:8000";

function ChatApp() {
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(SERVER_URL, { autoConnect: false });
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("listRooms", setRooms);
    socket.on("chat", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("listRooms");
      socket.off("chat");
    };
  }, [socket]);

  const connectSocket = () => {
    if (!socket) return;
    socket.auth = { token: "your_jwt_token" };
    socket.connect();
    socket.emit("requestRooms");
  };

  const createRoom = () => socket.emit("createRoom", { roomname: room });
  const joinRoom = () => socket.emit("joinRoom", { room, nickname });
  const sendMessage = () => {
    socket.emit("chat", { roomId: room, message });
    setMessage("");
  };

  return (
    <div>
      <ConnectionForm
        connectSocket={connectSocket}
        setNickname={setNickname}
        nickname={nickname}
      />
      <RoomList
        rooms={rooms}
        setRoom={setRoom}
        createRoom={createRoom}
        joinRoom={joinRoom}
        room={room}
      />
      <MessageList messages={messages} />
      <MessageForm
        sendMessage={sendMessage}
        setMessage={setMessage}
        message={message}
      />
    </div>
  );
}

export default ChatApp;

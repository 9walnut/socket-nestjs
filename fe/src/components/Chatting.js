import { useCallback, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import "../styles/chat.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Chat from "./Chat";
import Notice from "./Notice";

const socket = io.connect("http://localhost:8000", { autoConnect: false });
export default function Chatting2() {
  const [msgInput, setMsgInput] = useState("");
  const [userIdInput, setUserIdInput] = useState("");
  const [chatList, setChatList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userList, setUserList] = useState({});
  const [roomIdInput, setRoomIdInput] = useState("");
  const [dmTo, setDmTo] = useState("all");

  const initSocketConnect = () => {
    console.log("connected", socket.connected);
    if (!socket.connected) socket.connect();
  };

  useEffect(() => {
    socket.on("error", (res) => {
      alert(res.msg);
    });

    socket.on("entrySucess", (res) => {
      setUserId(res.userId);
    });

    socket.on("userList", (res) => {
      setUserList(res);
    });
  }, []);

  const userListOptions = useMemo(() => {
    const options = [];
    for (const key in userList) {
      if (userList[key] === userId) continue;
      options.push(
        <option key={key} value={key}>
          {userList[key]}
        </option>
      );
    }
    return options;
  }, [userList]);

  const addChatList = useCallback(
    (res) => {
      const content = `${res.dm ? "(속닥속닥) " : ""} ${res.userId}: ${
        res.msg
      }`;
      const type = res.userId === userId ? "my" : "other";
      const newChatList = [...chatList, { type: type, content: content }];
      setChatList(newChatList);
    },
    [userId, chatList]
  );

  useEffect(() => {
    socket.on("chat", addChatList);
    return () => socket.off("chat", addChatList);
  });

  useEffect(() => {
    const notice = (res) => {
      const newChatList = [...chatList, { type: "notice", content: res.msg }];
      setChatList(newChatList);
    };

    socket.on("notice", notice);
    return () => socket.off("notice", notice);
  }, [chatList]);

  const sendMsg = () => {
    if (msgInput !== "") {
      socket.emit("sendMsg", { userId: userId, msg: msgInput, dm: dmTo });
      setMsgInput("");
    }
  };

  const entryChat = () => {
    initSocketConnect();
    socket.emit("entry", { userId: userIdInput, roomId: roomIdInput });
    setUserId(userIdInput);
  };

  const disconnect = () => {
    socket.emit("leave", { userId: userId, roomId: roomIdInput });
    setUserId(null);
  };

  return (
    <>
      {userId ? (
        <>
          {" "}
          <header className="page-header">
            <div className="container">
              <h2>
                Hi {userId}! Welcom to room {roomIdInput}
              </h2>
            </div>
          </header>
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="user-log col-sm-4">
                  <h3 style={{ textAlign: "center", color: "white" }}>Users</h3>
                  <ul>
                    {Object.keys(userList).map((user, index) => (
                      <div className="active" key={index}>
                        <div
                          className="d-flex bd-highlight"
                          style={{
                            border: "1px solid grey",
                            borderRadius: "5px",
                            margin: "2px",
                            height: "90px",
                            background: "white",
                          }}
                        >
                          <div className="img_cont">
                            <img
                              src="img/user.png"
                              className="rounded-circle user_img"
                              alt="userIcon"
                              style={{
                                width: "40px",
                                height: "40px",
                                margin: "20px 10px 10px 15px",
                                verticalAlign: "middle",
                              }}
                            />
                            <span className="online_icon"></span>
                          </div>
                          <div className="user_info">
                            <span>{userList[user]}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ul>
                  {/* <h3>채팅방 목록</h3>
                  <ul>
                    {Object.keys(roomIdInput).map((room, index) => (
                      <li key={index}>{roomIdInput[room]}</li>
                    ))}
                  </ul> */}
                </div>
                <div className="col-sm-8">
                  <div className="col-auto">
                    <div className="chat-log">
                      {chatList.map((chat, i) => {
                        if (chat.type === "notice")
                          return <Notice key={i} chat={chat} />;
                        else return <Chat key={i} chat={chat} />;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-form">
            <div className="container">
              <form>
                <div className="row align-items-center">
                  <div className="col-sm-1 col-xs-1 mr-2">
                    <select
                      className="custom-select"
                      value={dmTo}
                      onChange={(e) => setDmTo(e.target.value)}
                    >
                      <option value="all">All</option>
                      {userListOptions}
                    </select>
                  </div>
                  <div className="col-sm-8 col-xs-4 mr-2">
                    <input
                      type="text"
                      className="form-control"
                      value={msgInput}
                      onChange={(e) => setMsgInput(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-1 col-xs-1">
                    <button
                      type="button"
                      className="btn btn-primary btn-block custom-btn"
                      onClick={sendMsg}
                    >
                      send
                    </button>
                  </div>
                  <div className="col-sm-1 col-xs-1">
                    <button
                      type="button"
                      className="btn btn-dark btn-block custom-btn"
                      onClick={disconnect}
                    >
                      exit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <section
          className="vh-100 login-dark"
          style={{
            backgroundImage: "url(/img/star-sky.jpg",
          }}
        >
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div
                  className="card text-white"
                  style={{
                    borderRadius: "25px",
                    backgroundColor: "#1e2833",
                    boxShadow: "3px 3px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      <div className="col-md-8 col-lg-4 col-xl-4 order-2 order-lg-1">
                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                          9walnut's Chat
                        </p>

                        <form className="mx-1 mx-md-4">
                          <div className="d-flex flex-row align-items-center mb-4">
                            <i
                              className="fas fa-crow fa-2x me-3"
                              style={{ color: "#709085" }}
                            ></i>
                            <input
                              type="text"
                              className="form-control my-input"
                              placeholder="Nickname"
                              style={{
                                background: "none",
                                border: "none",
                                borderBottom: "1px solid #434a52",
                                borderRadius: "0",
                                boxShadow: "none",
                                outline: "none",
                                color: "inherit",
                              }}
                              value={userIdInput}
                              onChange={(e) => setUserIdInput(e.target.value)}
                            />
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i
                              className="fas fa-crow fa-2x me-3"
                              style={{ color: "#709085" }}
                            ></i>
                            <input
                              type="text"
                              className="form-control my-input"
                              placeholder="Room name"
                              style={{
                                background: "none",
                                border: "none",
                                borderBottom: "1px solid #434a52",
                                borderRadius: "0",
                                boxShadow: "none",
                                outline: "none",
                                color: "inherit",
                              }}
                              value={roomIdInput}
                              onChange={(e) => setRoomIdInput(e.target.value)}
                            />
                          </div>

                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button
                              type="button"
                              className="btn btn-primary btn-lg"
                              onClick={entryChat}
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

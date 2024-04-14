import React, { useContext, useEffect, useRef, useState } from "react";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import apiRequest from "../../lib/apiRequest";
import { useNotificationStore } from "../../lib/notificationStore";
import "./Chat.scss";

const Chat = ({ chats }) => {
  const [currentChat, setCurrentChat] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef();
  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smotth" });
  }, [currentChat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setCurrentChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitMessage = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const text = formData.get("chatInput");
    if (!text) return;

    try {
      const res = await apiRequest.post("/messages/" + currentChat.id, {
        text,
      });
      setCurrentChat((prev) => ({
        ...prev,
        messages: [...prev.messages, res.data],
      }));
      event.target.reset();
      socket.emit("sendMessage", {
        receiverId: currentChat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + currentChat.id);
      } catch (err) {
        console.log(err);
      }
    };

    if (currentChat && socket) {
      socket.on("getMessage", (data) => {
        if (currentChat.id === data.chatId) {
          setCurrentChat((prev) => ({
            ...prev,
            messages: [...prev.messages, data],
          }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [currentChat, socket]);

  return (
    <div className="chat">
      <div className="messages">
        {chats.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                c.seenBy.includes(currentUser.id) || c.id === currentChat.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>

      {currentChat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={currentChat.receiver.avatar || "/noavatar.jpg"}
                alt=""
              />
              {currentChat.receiver.username}
            </div>
            <span className="close" onClick={() => setCurrentChat(false)}>
              X
            </span>
          </div>

          <div className="center">
            {currentChat.messages.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.Id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.Id ? "right" : "left",
                }}
                key={message.id}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>

          <form onSubmit={handleSubmitMessage} className="bottom">
            <textarea name="chatInput" id="chatInput" />
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;

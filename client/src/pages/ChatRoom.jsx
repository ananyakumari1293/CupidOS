import {
  useState,
  useRef,
  useEffect
} from "react";

import axios from "axios";

import {
  useNavigate,
  useParams,
  useLocation
} from "react-router-dom";

import io from "socket.io-client";

const socket = io(
  "https://cupidos-backend-uzi7.onrender.com"
);

function ChatRoom() {

  const navigate = useNavigate();

  const { roomId } = useParams();

  const location = useLocation();

  /* USERNAME */

  const savedUsername =
    localStorage.getItem("username");

  const username =
    location.state?.username ||
    savedUsername ||
    "Anonymous";

  useEffect(() => {

    localStorage.setItem(
      "username",
      username
    );

  }, [username]);

  /* STATES */

  const [message, setMessage] =
    useState("");

  const [typingUser, setTypingUser] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [timeLeft, setTimeLeft] =
    useState(300);

  const [timerActive, setTimerActive] =
    useState(true);

  const messagesEndRef =
    useRef(null);

  /* LOAD OLD MESSAGES */

  useEffect(() => {

    const loadMessages = async () => {

      try {

        const res =
          await axios.get(
            `https://cupidos-backend-uzi7.onrender.com/messages/${roomId}`
          );

        const formattedMessages =
          res.data.map((msg) => ({

            ...msg,

            sender:
              msg.username === username
                ? "right"
                : "left",

            avatar:
              msg.username === username
                ? "☁️"
                : "💖"

          }));

        setMessages(
          formattedMessages
        );

      }

      catch(err) {

        console.log(err);

      }

    };

    loadMessages();

  }, [roomId, username]);

  /* JOIN ROOM */

  useEffect(() => {

    socket.emit(
      "join_room",
      roomId
    );

  }, [roomId]);

  /* RECEIVE MESSAGE */

  useEffect(() => {

    socket.on(
      "receive_message",
      (data) => {

        setMessages((prev) => [

          ...prev,

          {
            ...data,

            sender:
              data.username === username
                ? "right"
                : "left",

            avatar:
              data.username === username
                ? "☁️"
                : "💖"

          }

        ]);

      }
    );

    return () => {

      socket.off(
        "receive_message"
      );

    };

  }, [username]);

  /* TYPING */

  useEffect(() => {

    socket.on(
      "show_typing",
      (username) => {

        setTypingUser(
          `${username} is typing...`
        );

        setTimeout(() => {

          setTypingUser("");

        }, 1200);

      }
    );

    return () => {

      socket.off(
        "show_typing"
      );

    };

  }, []);

  /* AUTO SCROLL */

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  /* TIMER */

  useEffect(() => {

    if(!timerActive) return;

    if(timeLeft <= 0) {

      navigate(
        `/analysis/${roomId}`
      );

      return;

    }

    const interval =
      setInterval(() => {

        setTimeLeft((prev) =>
          prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(interval);

  }, [
    timeLeft,
    timerActive,
    navigate,
    roomId
  ]);

  /* FORMAT TIMER */

  const formatTime = (seconds) => {

    const mins =
      Math.floor(seconds / 60);

    const secs =
      seconds % 60;

    return `${mins}:${
      secs < 10
        ? "0"
        : ""
    }${secs}`;

  };

  /* CURRENT TIME */

  const getCurrentTime = () => {

    const now = new Date();

    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  };

  /* SEND MESSAGE */

  const sendMessage = () => {

    if(message.trim() === "")
      return;

    const randomReactions = [
      "♡",
      "✨",
      "☁️",
      "💌",
      "💖"
    ];

    const messageData = {

      roomId,

      socketId: socket.id,

      username,

      text: message,

      time: getCurrentTime(),

      reaction:
        randomReactions[
          Math.floor(
            Math.random() *
            randomReactions.length
          )
        ]

    };

    socket.emit(
      "send_message",
      messageData
    );

    setMessage("");

  };

  return (

    <div className="chat-card">

      {/* TOP */}

      <div className="chat-top">

        <div>

          <h2>
            ♡ {username}'s Room
          </h2>

          <p>
            {roomId} · live chat
          </p>

        </div>

        <div className="chat-actions">

          <div className="timer-box">

            ⏳ {formatTime(timeLeft)}

          </div>

          <button
            className="leave-btn"
            onClick={() =>
              navigate(
                `/analysis/${roomId}`
              )
            }
          >

            analyze ♡

          </button>

        </div>

      </div>

      {/* MESSAGES */}

      <div className="messages">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`message-row ${msg.sender}`}
          >

            {msg.sender === "left" && (

              <div className="avatar">
                {msg.avatar}
              </div>

            )}

            <div>

              <div className="message-username">

                {msg.username || "Anonymous"}

              </div>

              <div
                className={`message ${msg.sender}`}
              >

                {msg.text}

                <div className="reaction">
                  {msg.reaction}
                </div>

              </div>

              <span className="time">

                {msg.time}

              </span>

            </div>

            {msg.sender === "right" && (

              <div className="avatar">

                ☁️

              </div>

            )}

          </div>

        ))}

        {typingUser && (

          <div className="typing-indicator">

            💖 {typingUser}

          </div>

        )}

        <div ref={messagesEndRef}></div>

      </div>

      {/* INPUT */}

      <div className="chat-input">

        <input
          type="text"
          placeholder="type something cute..."
          value={message}
          onChange={(e) => {

            setMessage(
              e.target.value
            );

            socket.emit(
              "typing",
              {
                roomId,
                username
              }
            );

          }}
          onKeyDown={(e) => {

            if(e.key === "Enter") {

              sendMessage();

            }

          }}
        />

        <button onClick={sendMessage}>

          send ♡

        </button>

      </div>

    </div>

  );

}

export default ChatRoom;
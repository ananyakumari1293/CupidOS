import {
  useState,
  useEffect
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

function JoinRoom() {

  const navigate = useNavigate();

  const { roomId } = useParams();

  const [username, setUsername] =
    useState("");

  const [roomCode, setRoomCode] =
    useState("");

  /* AUTO FILL ROOM CODE */

  useEffect(() => {

    if(roomId) {

      setRoomCode(roomId);

    }

  }, [roomId]);

  /* JOIN ROOM */

  const joinRoom = () => {

    if(
      username.trim() === "" ||
      roomCode.trim() === ""
    ) {

      alert(
        "fill all fields 💖"
      );

      return;

    }

    navigate(

      `/room/${roomCode}`,

      {
        state: {
          username
        }
      }

    );

  };

  return (

    <div className="room-card">

      <div className="small-tag">

        ✨ join session

      </div>

      <h1 className="room-title">

        join your room ♡

      </h1>

      <p className="room-subtitle">

        reconnect with your person

      </p>

      {/* USERNAME */}

      <div className="input-group">

        <label>
          YOUR NAME
        </label>

        <input
          type="text"
          placeholder="Ananya"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />

      </div>

      {/* ROOM CODE */}

      <div className="input-group">

        <label>
          ROOM CODE
        </label>

        <input
          type="text"
          placeholder="LOVE77"
          value={roomCode}
          onChange={(e) =>
            setRoomCode(
              e.target.value
            )
          }
        />

      </div>

      <button
        className="primary-btn"
        onClick={joinRoom}
      >

        join room ♡

      </button>

      <div
        className="back-btn"
        onClick={() => navigate("/")}
      >

        ← back

      </div>

    </div>

  );

}

export default JoinRoom;
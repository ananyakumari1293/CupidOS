import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

function CreateRoom() {

  const navigate = useNavigate();

  /* USERNAME */

  const [username, setUsername] =
    useState("");

  /* SESSION TYPE */

  const [sessionType, setSessionType] =
    useState("Couple");

  /* ROOM ID */

  const roomId =
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

  /* INVITE LINK */

  const inviteLink =
    `https://cupid-os-iota.vercel.app/join/${roomId}`;

  /* COPY LINK */

  const copyInvite = async () => {

    try {

      await navigator.clipboard.writeText(
        inviteLink
      );

      alert(
        "invite link copied ✨"
      );

    }

    catch(err) {

      console.log(err);

    }

  };

  /* ENTER ROOM */

  const enterRoom = () => {

    if(username.trim() === "") {

      alert(
        "enter your name 💖"
      );

      return;

    }

    navigate(

      `/room/${roomId}`,

      {
        state: {

          username,

          sessionType

        }
      }

    );

  };

  return (

    <div className="room-card">

      {/* TOP */}

      <div className="small-tag">
        ♡ new session
      </div>

      <h1 className="room-title">
        create your room ♡
      </h1>

      <p className="room-subtitle">
        share the code with your partner!
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

      {/* SESSION TYPE */}

      <div className="input-group">

        <label>
          SESSION TYPE
        </label>

        <div className="session-grid">

          {/* COUPLE */}

          <div

            className={
              sessionType === "Couple"
              ? "session-box active"
              : "session-box"
            }

            onClick={() =>
              setSessionType("Couple")
            }
          >

            <h3>💖</h3>

            <h2>Couple</h2>

            <p>romantic ♡</p>

          </div>

          {/* FRIENDS */}

          <div

            className={
              sessionType === "Friends"
              ? "session-box active"
              : "session-box"
            }

            onClick={() =>
              setSessionType("Friends")
            }
          >

            <h3>🤝</h3>

            <h2>Friends</h2>

            <p>friendship ✦</p>

          </div>

        </div>

      </div>

      {/* ROOM CODE */}

      <div className="code-box">

        <p>
          ROOM CODE
        </p>

        <h1>
          {roomId}
        </h1>

        <span>
          share with your partner ♡
        </span>

      </div>

      {/* BUTTONS */}

      <button
        className="primary-btn"
        onClick={enterRoom}
      >

        enter room ♡

      </button>

      <button
        className="secondary-btn"
        onClick={copyInvite}
      >

        copy invite link!

      </button>

      {/* BACK */}

      <div
        className="back-btn"
        onClick={() => navigate("/")}
      >

        ← back

      </div>

    </div>

  );

}

export default CreateRoom;
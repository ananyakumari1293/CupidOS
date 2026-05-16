import { useNavigate } from "react-router-dom";

function CreateRoom() {

  const navigate = useNavigate();

  const roomId =
    Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

  const inviteLink =
    `http://localhost:5173/room/${roomId}`;

  const copyInvite = async () => {

    try{

      await navigator.clipboard.writeText(
        inviteLink
      );

      alert("invite link copied ✨");

    }

    catch(err){

      console.log(err);

    }

  };

  return (

    <div className="room-card">

      <div className="small-tag">
        ♡ new session
      </div>

      <h1 className="room-title">
        create your room ♡
      </h1>

      <p className="room-subtitle">
        share the code with your partner!
      </p>

      <div className="input-group">

        <label>YOUR NAME</label>

        <input
          type="text"
          placeholder="Alex"
        />

      </div>

      <div className="input-group">

        <label>SESSION TYPE</label>

        <div className="session-grid">

          <div className="session-box active">

            <h3>💖</h3>

            <h2>Couple</h2>

            <p>romantic ♡</p>

          </div>

          <div className="session-box">

            <h3>🤝</h3>

            <h2>Friends</h2>

            <p>friendship ✦</p>

          </div>

        </div>

      </div>

      <div className="code-box">

        <p>ROOM CODE</p>

        <h1>{roomId}</h1>

        <span>
          share with your partner ♡
        </span>

      </div>

      <button
        className="primary-btn"
        onClick={() => navigate(`/room/${roomId}`)}
      >
        enter room ♡
      </button>

      <button
        className="secondary-btn"
        onClick={copyInvite}
      >
        copy invite link!
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

export default CreateRoom;
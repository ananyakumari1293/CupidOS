import axios from "axios";

import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const testBackend = async () => {

    try{

      const res = await axios.get(
        "http://localhost:5000"
      );

      console.log(res.data);

    }

    catch(err){

      console.log(err);

    }

  };

  return (

    <div className="hero-card">

      <div className="logo">♡ CupidOS</div>

      <h1>
        your <br />
        relationship <br />
        wrapped ♡
      </h1>

      <p className="subtitle">
        AI chemistry · cute multiplayer · emotional sync
      </p>

      <div className="tags">

        <span>✦ AI chemistry</span>

        <span>♡ cute multiplayer</span>

        <span>☁ emotional sync</span>

      </div>

      <div className="buttons">

        <button
          className="primary-btn"
          onClick={() => navigate("/create")}
        >
          ♡ Create Room
        </button>

        <button
  className="secondary-btn"
  onClick={() => navigate("/join")}
>
  ✦ Join Room
</button>

      </div>

      <div className="stats">

        <div className="stat">
          <h2>12K+</h2>
          <p>sessions</p>
        </div>

        <div className="stat">
          <h2>94%</h2>
          <p>accuracy</p>
        </div>

        <div className="stat">
          <h2>38</h2>
          <p>metrics</p>
        </div>

      </div>

    </div>

  );
}

export default Home;
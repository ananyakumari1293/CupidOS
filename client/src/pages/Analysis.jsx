import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate,
  useParams
} from "react-router-dom";

function Analysis() {

  const navigate = useNavigate();

  const { roomId } = useParams();

  const [messages, setMessages] =
    useState([]);

  const [analysis, setAnalysis] =
    useState(null);

  /* LOAD MESSAGES */

  useEffect(() => {

    const fetchMessages = async () => {

      try {

        const res =
          await axios.get(
            `https://cupidos-backend-uzi7.onrender.com/messages/${roomId}`
          );

        setMessages(res.data);

      }

      catch(err) {

        console.log(err);

      }

    };

    fetchMessages();

  }, [roomId]);

  /* ANALYSIS */

  useEffect(() => {

    if(messages.length === 0) return;

    const texts =
      messages.map((msg) =>
        msg.text.toLowerCase()
      );

    /* WORD LISTS */

    const positiveWords = [
      "love",
      "miss",
      "cute",
      "baby",
      "sweet",
      "beautiful",
      "hehe",
      "haha",
      "lol",
      "goodnight",
      "good morning",
      "proud",
      "care",
      "best",
      "mine",
      "kiss",
      "hug"
    ];

    const dryWords = [
      "k",
      "ok",
      "hmm",
      "fine",
      "cool",
      "alr",
      "bye"
    ];

    const toxicWords = [
      "hate",
      "stupid",
      "annoying",
      "leave",
      "idiot",
      "ugly"
    ];

    /* COUNTERS */

    let positiveCount = 0;

    let dryCount = 0;

    let toxicCount = 0;

    let emojiCount = 0;

    let longMessages = 0;

    let playfulCount = 0;

    /* DETECT */

    texts.forEach((text) => {

      positiveWords.forEach((word) => {

        if(text.includes(word)) {

          positiveCount++;

        }

      });

      dryWords.forEach((word) => {

        if(text === word) {

          dryCount++;

        }

      });

      toxicWords.forEach((word) => {

        if(text.includes(word)) {

          toxicCount++;

        }

      });

      if(
        /💖|❤️|😭|✨|🥹|😍|😘|💕|💌|😚|😩/.test(text)
      ) {

        emojiCount++;

      }

      if(text.length > 35) {

        longMessages++;

      }

      if(
        /haha|lol|hehe|lmao|😭|😂/.test(text)
      ) {

        playfulCount++;

      }

    });

    /* SCORE */

    let score = 50;

    score += positiveCount * 4;

    score += emojiCount * 2;

    score += longMessages * 3;

    score += playfulCount * 2;

    score -= dryCount * 5;

    score -= toxicCount * 12;

    if(score > 98) score = 98;

    if(score < 12) score = 12;

    /* ENERGY */

    let energy =
      "Cozy Energy ☀";

    if(playfulCount > 5) {

      energy =
        "Golden Retriever Energy ✨";

    }

    if(longMessages > 5) {

      energy =
        "Deep Emotional Bond 💖";

    }

    /* DRY RISK */

    let dryRisk =
      "Extremely Low";

    if(dryCount > 3) {

      dryRisk = "Medium";

    }

    if(dryCount > 8) {

      dryRisk = "High";

    }

    /* CHEMISTRY */

    let chemistry =
      "emotionally warm and connected";

    if(score > 85) {

      chemistry =
        "insanely strong chemistry detected";

    }

    if(score < 40) {

      chemistry =
        "connection feels emotionally distant";

    }

    /* AI OBSERVATIONS */

    const observations = [];

    if(playfulCount > 4) {

      observations.push(
        "💖 You both naturally mirror each other's humor."
      );

    }

    if(longMessages > 3) {

      observations.push(
        "☁ Deep emotional conversations are happening frequently."
      );

    }

    if(emojiCount > 5) {

      observations.push(
        "✨ Emotional expression is highly visible in chats."
      );

    }

    if(dryCount > 5) {

      observations.push(
        "🌧 Some dry texting patterns were detected."
      );

    }

    if(toxicCount > 0) {

      observations.push(
        "⚠ Negative language occasionally appeared in conversation."
      );

    }

    if(observations.length === 0) {

      observations.push(
        "💌 Your conversations feel balanced and emotionally comfortable."
      );

    }

    /* ADVICE */

    let advice =
      "Keep communicating openly and consistently 💖";

    if(score > 85) {

      advice =
        "Your emotional compatibility is amazing — keep nurturing it ✨";

    }

    if(dryCount > 5) {

      advice =
        "Try adding more curiosity and emotional warmth to conversations ☁";

    }

    if(longMessages < 2) {

      advice =
        "Spend more time discussing feelings and memories together 💌";

    }

    if(toxicCount > 0) {

      advice =
        "Be mindful of harsh wording during emotional moments 🌧";

    }

    setAnalysis({

      score,

      totalMessages:
        messages.length,

      dryRisk,

      energy,

      chemistry,

      observations,

      advice

    });

  }, [messages]);

  if(!analysis) {

    return (

      <div className="analysis-card">

        <h1>
          analyzing your relationship... ✨
        </h1>

      </div>

    );

  }

  return (

    <div className="analysis-card">

      {/* TOP */}

      <div className="analysis-top">

        <h1>
          your relationship wrapped ♡
        </h1>

        <p>
          generated by CupidOS ✨
        </p>

      </div>

      {/* SCORE */}

      <div className="love-score">

        <h2>
          {analysis.score}%
        </h2>

        <span>
          love sync ♡
        </span>

      </div>

      {/* GRID */}

      <div className="analysis-grid">

        <div className="analysis-box yellow">

          <h3>
            {analysis.energy}
          </h3>

          <p>
            emotional energy detected
          </p>

        </div>

        <div className="analysis-box pink">

          <h3>
            💌 Message Count
          </h3>

          <p>
            {analysis.totalMessages} messages exchanged
          </p>

        </div>

        <div className="analysis-box white">

          <h3>
            ☁ Dry Texting Risk
          </h3>

          <p>
            {analysis.dryRisk}
          </p>

        </div>

        <div className="analysis-box lavender">

          <h3>
            ✨ Chemistry Status
          </h3>

          <p>
            {analysis.chemistry}
          </p>

        </div>

      </div>

      {/* AI NOTES */}

      <div className="ai-notes">

        <h2>
          AI observations ✨
        </h2>

        {
          analysis.observations.map(
            (note, index) => (

              <div
                key={index}
                className="note"
              >

                {note}

              </div>

            )
          )
        }

      </div>

      {/* ADVICE */}

      <div className="ai-notes">

        <h2>
          relationship advice 💖
        </h2>

        <div className="note">
          {analysis.advice}
        </div>

      </div>

      <button
        className="primary-btn"
        onClick={() => navigate("/")}
      >

        back home ♡

      </button>

    </div>

  );

}

export default Analysis;
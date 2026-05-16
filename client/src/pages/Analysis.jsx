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

  /* FETCH MESSAGES */

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

  /* ANALYSIS ENGINE */

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
      "hug",
      "always",
      "forever",
      "pretty",
      "happy",
      "safe",
      "comfort",
      "wife",
      "husband"
    ];

    const dryWords = [
      "k",
      "ok",
      "hmm",
      "fine",
      "cool",
      "alr",
      "bye",
      "huh"
    ];

    const toxicWords = [
      "hate",
      "stupid",
      "annoying",
      "leave",
      "idiot",
      "ugly",
      "shut up"
    ];

    /* COUNTERS */

    let positiveCount = 0;

    let dryCount = 0;

    let toxicCount = 0;

    let emojiCount = 0;

    let longMessages = 0;

    let playfulCount = 0;

    let emotionalCount = 0;

    /* DETECT PATTERNS */

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

      if(
        /miss|care|love|safe|forever|always|proud|hug/.test(text)
      ) {

        emotionalCount++;

      }

    });

    /* LOVE SCORE */

    let score = 50;

    score += positiveCount * 4;

    score += emojiCount * 2;

    score += longMessages * 3;

    score += playfulCount * 2;

    score += emotionalCount * 5;

    score -= dryCount * 5;

    score -= toxicCount * 12;

    if(score > 98) score = 98;

    if(score < 15) score = 15;

    /* DYNAMIC ANALYSIS BOXES */

    let energyTitle =
      "☀ Cozy Energy";

    let cozyText =
      "emotionally warm and active";

    let dryRisk =
      "extremely low detected risk";

    let chemistry =
      "strong emotional interaction";

    /* 0 - 30 */

    if(score <= 30) {

      energyTitle =
        "🌧 Emotional Distance";

      cozyText =
        "very low emotional warmth detected";

      dryRisk =
        "very high dry texting patterns";

      chemistry =
        "communication feels emotionally disconnected";

    }

    /* 31 - 50 */

    else if(score <= 50) {

      energyTitle =
        "☁ Unstable Energy";

      cozyText =
        "mixed emotional consistency detected";

      dryRisk =
        "moderate emotional distance";

      chemistry =
        "connection exists but needs emotional effort";

    }

    /* 51 - 70 */

    else if(score <= 70) {

      energyTitle =
        "✨ Growing Connection";

      cozyText =
        "comfortable emotional interaction";

      dryRisk =
        "low dry texting patterns";

      chemistry =
        "healthy communication patterns detected";

    }

    /* 71 - 90 */

    else if(score <= 90) {

      energyTitle =
        "💖 Cozy Energy";

      cozyText =
        "emotionally warm and secure";

      dryRisk =
        "extremely low detected risk";

      chemistry =
        "strong emotional compatibility";

    }

    /* 91 - 100 */

    else {

      energyTitle =
        "💞 Soulmate Energy";

      cozyText =
        "deep emotional attachment detected";

      dryRisk =
        "almost zero emotional distance";

      chemistry =
        "extremely rare emotional synchronization";

    }

    /* OBSERVATIONS */

    const observations = [];

    if(playfulCount > 4) {

      observations.push(
        "💖 You both naturally mirror each other's humor and energy."
      );

    }

    if(longMessages > 4) {

      observations.push(
        "☁ Deep conversations are happening frequently between both partners."
      );

    }

    if(emotionalCount > 5) {

      observations.push(
        "✨ Strong emotional reassurance patterns were detected."
      );

    }

    if(emojiCount > 5) {

      observations.push(
        "💌 Emotional expression is highly visible through texting style."
      );

    }

    if(dryCount > 5) {

      observations.push(
        "🌧 Some emotionally distant texting patterns appeared occasionally."
      );

    }

    if(toxicCount > 0) {

      observations.push(
        "⚠ Negative wording appeared in certain moments of the conversation."
      );

    }

    if(messages.length > 20) {

      observations.push(
        "💞 Consistent communication effort exists from both sides."
      );

    }

    if(observations.length === 0) {

      observations.push(
        "💖 Your conversations feel emotionally balanced and comforting."
      );

    }

    /* ADVICE SYSTEM */

    const advicePool = [];

    if(score > 85) {

      advicePool.push(
        "Your emotional compatibility is genuinely strong — keep nurturing this safe space ✨"
      );

      advicePool.push(
        "You both naturally create emotional comfort for each other 💖"
      );

      advicePool.push(
        "The emotional consistency between you two is rare and beautiful ☁"
      );

    }

    if(playfulCount > 5) {

      advicePool.push(
        "Humor is one of your strongest emotional connectors 😭✨"
      );

      advicePool.push(
        "Keep maintaining this playful energy — it strengthens attachment 💌"
      );

    }

    if(longMessages < 2) {

      advicePool.push(
        "Try discussing deeper emotions and personal memories more often 💞"
      );

      advicePool.push(
        "Emotional vulnerability could strengthen this connection further ✨"
      );

    }

    if(dryCount > 5) {

      advicePool.push(
        "Small affectionate replies can significantly improve emotional warmth 💖"
      );

      advicePool.push(
        "Try showing more curiosity and engagement during conversations ☁"
      );

    }

    if(toxicCount > 0) {

      advicePool.push(
        "Soft communication during emotional moments will improve long-term trust 🌧"
      );

      advicePool.push(
        "Be mindful of emotionally harsh wording during disagreements 💌"
      );

    }

    if(messages.length < 10) {

      advicePool.push(
        "Spending more consistent time together could deepen emotional chemistry 💖"
      );

    }

    if(advicePool.length === 0) {

      advicePool.push(
        "Your conversations currently feel emotionally healthy and balanced ✨"
      );

    }

    const randomAdvice =

      advicePool[
        Math.floor(
          Math.random() *
          advicePool.length
        )
      ];

    /* FINAL ANALYSIS */

    setAnalysis({

      score,

      energyTitle,

      cozyText,

      totalMessages:
        messages.length,

      dryRisk,

      chemistry,

      observations,

      randomAdvice

    });

  }, [messages]);

  /* LOADING */

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
            {analysis.energyTitle}
          </h3>

          <p>
            {analysis.cozyText}
          </p>

        </div>

        <div className="analysis-box pink">

          <h3>
            💌 Message Count
          </h3>

          <p>
            {analysis.totalMessages}
            total messages exchanged
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

      {/* OBSERVATIONS */}

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

          {analysis.randomAdvice}

        </div>

      </div>

      {/* BUTTON */}

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
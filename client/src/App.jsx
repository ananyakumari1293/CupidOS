import "./index.css";

import {
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import CreateRoom from "./pages/CreateRoom";
import ChatRoom from "./pages/ChatRoom";
import Analysis from "./pages/Analysis";
import JoinRoom from "./pages/JoinRoom";

function App() {

  return (

    <div className="app">

      <div className="floating-heart heart1">💗</div>
      <div className="floating-heart heart2">✨</div>
      <div className="floating-heart heart3">☁️</div>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/create"
          element={<CreateRoom />}
        />

        <Route
  path="/join"
  element={<JoinRoom />}
/>

        <Route
          path="/room/:roomId"
          element={<ChatRoom />}
        />

        <Route
          path="/analysis/:roomId"
          element={<Analysis />}
        />

      </Routes>

    </div>

  );
}

export default App;
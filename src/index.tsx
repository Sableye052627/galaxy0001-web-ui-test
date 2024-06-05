import ReactDOM from "react-dom/client";
import App from "./App";

import "./locales/config";
import "antd/dist/reset.css";
import "swiper/css";

import PlayerContext from "./context/player/PlayerContext";
import ApiContext from "./context/ApiContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <PlayerContext>
    <ApiContext>
      <App />
    </ApiContext>
  </PlayerContext>
);

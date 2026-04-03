import { useState } from "react";
import "./App.css";
import uiUp from "./assets/up.png";
import uiUp2 from "./assets/up2.png";
import uiDown from "./assets/down.png";
import uiDown2 from "./assets/down2.png";
import buttonLeft from "./assets/leftbutton.png";
import buttonRight from "./assets/rightbutton.png";
import SL from "./assets/SL.png";

function App() {
  const [buttonsOpen, setButtonsOpen] = useState(true);
  const [category, setCategory] = useState("all");
  const [shake, setShake] = useState(false);

  const handleLeftClick = (e) => {
    e.stopPropagation();

    if (window.innerWidth / window.innerHeight > 1) {
    } else {
      setButtonsOpen(false);
    }
  };

  const handleRightClick = (e) => {
    e.stopPropagation();
  };

  const handleCategoryClick = (value, e) => {
    e.stopPropagation();
    if (window.innerWidth / window.innerHeight > 1) {
      setCategory(value);
    } else {
      if (buttonsOpen) {
        setButtonsOpen(false);
      } else {
        setCategory(value);
        setButtonsOpen(true);
      }
    }
  };

  const handleBackgroundClick = () => {
    setButtonsOpen(true);
    if (!shake) {
      setTimeout(() => {
        setShake(true);
        setTimeout(() => setShake(false), 300);
      }, 100);
    }
  };

  return (
    <div className="game-container" onClick={handleBackgroundClick}>
      <div className="bg-base"></div>
      <div className="bg-plus"></div>
      <div className="bg-grid"></div>

      <img src={SL} className={`bag ${shake ? "shake" : ""}`} />

      <img src={uiUp} className="top-ui landscape" />
      <img src={uiUp2} className="top-ui portrait" />

      <div className="bottom-ui-wrapper">
        <img src={uiDown} className="bottom-ui landscape" />
        <img src={uiDown2} className="bottom-ui portrait" />

        <div className="category-bar">
          {["H", "A", "B", "C", "D", "S", "all"].map((c) => (
            <div key={c} onClick={(e) => handleCategoryClick(c, e)}>
              {c}
            </div>
          ))}
        </div>
      </div>

      <div className={`button-wrapper ${buttonsOpen ? "" : "open"}`}>
        <img
          src={buttonRight}
          className="right-button"
          onClick={handleRightClick}
        />

        <div className="left-button-wrapper" onClick={handleLeftClick}>
          <img src={buttonLeft} className="left-button" />
          <div className="category-label">{category}</div>
        </div>
      </div>
    </div>
  );
}

export default App;

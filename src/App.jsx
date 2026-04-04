import { useState, useEffect } from "react";
import "./App.css";
import uiUp from "./assets/up.png";
import uiUp2 from "./assets/up2.png";
import uiDown from "./assets/down.png";
import uiDown2 from "./assets/down2.png";
import buttonLeft from "./assets/leftbutton.png";
import buttonRight from "./assets/rightbutton.png";
import CL from "./assets/CL.png";
import CM from "./assets/CM.png";
import CS from "./assets/CS.png";
const bagImages = {
  C: { S: CS, M: CM, L: CL },
};
function App() {
  const [buttonsOpen, setButtonsOpen] = useState(true);
  const [category, setCategory] = useState("all");
  const [bagType, setBagType] = useState("C");
  const [bagSize, setBagSize] = useState("L");
  const [shake, setShake] = useState(false);
  const [fly, setFly] = useState(false);
  const [drop, setDrop] = useState(false);
  const [tackleNum, setTackleNum] = useState(0);

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
    if (buttonsOpen) {
      if (!shake && !fly && !drop) {
        if (
          (bagSize == "S" && tackleNum == 9) ||
          (bagSize == "M" && tackleNum == 24) ||
          (bagSize == "L" && tackleNum == 49)
        ) {
          setTackleNum(0);
          setTimeout(() => {
            setFly(true);
            setTimeout(() => {
              setFly(false);
              setDrop(true);

              const sizes = ["S", "M", "L"];
              setBagSize(sizes[Math.floor(Math.random() * sizes.length)]);

              setTimeout(() => {
                setDrop(false);
              }, 500);
            }, 800);
          }, 800);
        } else {
          setTackleNum(tackleNum + 1);
          setTimeout(() => {
            setShake(true);
            setTimeout(() => setShake(false), 300);
          }, 100);
        }
      }
    } else {
      setButtonsOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      handleBackgroundClick();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="game-container" onClick={handleBackgroundClick}>
      <div className="bg-base"></div>
      <div className="bg-plus"></div>
      <div className="bg-grid"></div>

      <img
        src={bagImages[bagType][bagSize]}
        className={`bag ${shake ? "shake" : ""} ${fly ? "fly" : ""} ${drop ? "drop" : ""}`}
      />

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

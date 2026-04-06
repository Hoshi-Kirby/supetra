import { useState, useEffect } from "react";
import "./App.css";
import uiUp from "./assets/up.png";
import uiUp2 from "./assets/up2.png";
import uiDown from "./assets/down.png";
import uiDown2 from "./assets/down2.png";
import buttonLeft from "./assets/leftbutton.png";
import buttonRight from "./assets/rightbutton.png";
import defaultImg from "./assets/god.png";
import HL from "./assets/HL.png";
import HM from "./assets/HM.png";
import HS from "./assets/HS.png";
import AL from "./assets/AL.png";
import AM from "./assets/AM.png";
import AS from "./assets/AS.png";
import BL from "./assets/BL.png";
import BM from "./assets/BM.png";
import BS from "./assets/BS.png";
import CL from "./assets/CL.png";
import CM from "./assets/CM.png";
import CS from "./assets/CS.png";
import DL from "./assets/DL.png";
import DM from "./assets/DM.png";
import DS from "./assets/DS.png";
import SL from "./assets/SL.png";
import SM from "./assets/SM.png";
import SS from "./assets/SS.png";
import X from "./assets/x2.png";
const bagImages = {
  H: { S: HS, M: HM, L: HL },
  A: { S: AS, M: AM, L: AL },
  B: { S: BS, M: BM, L: BL },
  C: { S: CS, M: CM, L: CL },
  D: { S: DS, M: DM, L: DL },
  S: { S: SS, M: SM, L: SL },
  X: { S: X, M: X, L: X },
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
  const [userImage, setUserImage] = useState(defaultImg);
  const [hit, setHit] = useState(false);
  const [finalHit, setFinalHit] = useState(0);

  const handleLeftClick = (e) => {
    e.stopPropagation();

    if (window.innerWidth / window.innerHeight > 1) {
    } else {
      setButtonsOpen(false);
    }
  };

  const handleRightClick = (e) => {
    e.stopPropagation();

    setTackleNum(0);
    setTimeout(() => {
      setFly(true);
      setTimeout(() => {
        setFly(false);
        setDrop(true);

        const sizes = ["S", "M", "L"];
        setBagSize(sizes[Math.floor(Math.random() * sizes.length)]);

        if (category === "all") {
          const rareChance = Math.random();
          if (rareChance < 0.1) {
            setBagType("X");
          } else {
            const types = ["H", "A", "B", "C", "D", "S"];
            const randomType = types[Math.floor(Math.random() * types.length)];
            setBagType(randomType);
          }
        } else {
          setBagType(category);
        }

        setTimeout(() => {
          setDrop(false);
        }, 500);
      }, 800);
    }, 0);
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
      if (!shake && !fly && !drop && !hit) {
        if (
          (bagSize == "S" && tackleNum == 9) ||
          (bagSize == "M" && tackleNum == 24) ||
          (bagSize == "L" && tackleNum == 49)
        ) {
          setTackleNum(0);
          setFinalHit(1);
          setTimeout(() => {
            setFly(true);
            setTimeout(() => {
              setFly(false);
              setDrop(true);

              const sizes = ["S", "M", "L"];
              setBagSize(sizes[Math.floor(Math.random() * sizes.length)]);

              if (category === "all") {
                const rareChance = Math.random();
                if (rareChance < 0.1) {
                  setBagType("X");
                } else {
                  const types = ["H", "A", "B", "C", "D", "S"];
                  const randomType =
                    types[Math.floor(Math.random() * types.length)];
                  setBagType(randomType);
                }
              } else {
                setBagType(category);
              }

              setTimeout(() => {
                setDrop(false);
              }, 500);
            }, 800);
          }, 1230);

          setTimeout(() => {
            setFinalHit(0);
          }, 2100);
        } else {
          setTackleNum((prev) => prev + 1);

          setHit(true);

          setTimeout(() => {
            setShake(true);
            setTimeout(() => setShake(false), 300);
          }, 50);

          setTimeout(() => {
            setHit(false);
          }, 100);
        }
      }
    } else {
      setButtonsOpen(true);
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setUserImage(url);
  };

  useEffect(() => {
    let keyLocked = false;
    const handleKeyDown = (e) => {
      if (keyLocked) return;
      keyLocked = true;

      handleBackgroundClick();

      setTimeout(() => {
        keyLocked = false;
      }, 350); // 0.1秒だけロック
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [buttonsOpen, shake, fly, drop, tackleNum, bagSize, category]);

  return (
    <div className="game-container" onClick={handleBackgroundClick}>
      <div className="bg-base"></div>
      <div className="bg-plus"></div>
      <div className="bg-grid"></div>

      <img
        src={bagImages[bagType][bagSize]}
        className={`bag ${shake ? "shake" : ""} ${fly ? "fly" : ""} ${drop ? "drop" : ""}`}
      />
      <div
        className={`user-image-wrapper 
                 ${hit ? "hit" : ""} 
                 ${finalHit == 1 ? "final-hit1" : ""}
                 ${finalHit == 2 ? "final-hit2" : ""}`}
      >
        <img
          src={userImage}
          className={`user-image 
                 ${finalHit == 1 ? "final-hit1" : ""}
                 ${finalHit == 2 ? "final-hit2" : ""}`}
        />
      </div>

      <label className="file-button">
        画像を選ぶ
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="select-file"
        />
      </label>

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

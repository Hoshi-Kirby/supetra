import { useState, useEffect } from "react";
import "./App.css";
import uiUp from "./assets/up.png";
import uiUp2 from "./assets/up2.png";
import uiDown from "./assets/down.png";
import uiDown2 from "./assets/down2.png";
import he from "./assets/he.png";
import gauge from "./assets/gauge.png";
import buttonLeft from "./assets/leftbutton.png";
import buttonRight from "./assets/rightbutton.png";
import defaultImg from "./assets/god.png";
import exM from "./assets/exMark.png";
import hado from "./assets/hado.png";
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
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth,
  );
  const [buttonsOpen, setButtonsOpen] = useState(true);
  const [category, setCategory] = useState("all");
  const [bagType, setBagType] = useState("X");
  const [bagSize, setBagSize] = useState("S");
  const [bagType2, setBagType2] = useState("X");
  const [bagSize2, setBagSize2] = useState("S");
  const [shake, setShake] = useState(false);
  const [fly, setFly] = useState(false);
  const [drop, setDrop] = useState(false);
  const [tackleNum, setTackleNum] = useState(0);
  const [lastX, setLastX] = useState(false);
  const [lastX2, setLastX2] = useState(false);
  const [userImage, setUserImage] = useState(defaultImg);
  const [imageName, setImageName] = useState("ハバタクカミ");
  const [hit, setHit] = useState(false);
  const [finalHit, setFinalHit] = useState(0);
  const [finalShake, setFinalShake] = useState(0);
  const [isSerectTag, setIsSerectTag] = useState(false);
  const [tag, setTag] = useState("合計");
  const [zigOn, setZigOn] = useState(false);
  const [ev, setEv] = useState({
    H: 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    S: 0,
    total: 0,
  });
  const idle =
    !shake &&
    !fly &&
    !drop &&
    !hit &&
    finalHit === 0 &&
    !(
      (bagSize == "S" && tackleNum == 9) ||
      (bagSize == "M" && tackleNum == 24) ||
      (bagSize == "L" && tackleNum == 49)
    );

  const idleLast =
    !shake &&
    !fly &&
    !drop &&
    !hit &&
    finalHit === 0 &&
    ((bagSize == "S" && tackleNum == 9) ||
      (bagSize == "M" && tackleNum == 24) ||
      (bagSize == "L" && tackleNum == 49));
  const tagToKey = {
    合計: "total",
    HP: "H",
    攻撃: "A",
    防御: "B",
    特攻: "C",
    特防: "D",
    素早さ: "S",
  };
  const key = tagToKey[tag];

  const maxValue = !isPortrait ? 510 : tag === "合計" ? 510 : 252;

  const percentage = (ev[key] / maxValue) * 100;

  const getColorClass = (value) => {
    switch (value) {
      case "HP":
        return "color-hp";
      case "攻撃":
        return "color-atk";
      case "防御":
        return "color-def";
      case "特攻":
        return "color-spa";
      case "特防":
        return "color-spd";
      case "素早さ":
        return "color-spe";
      default:
        return "";
    }
  };
  const baseValue =
    bagSize === "S" ? 1 : bagSize === "M" ? 4 : bagSize === "L" ? 12 : 0;
  const baseValue2 =
    bagSize2 === "S" ? 1 : bagSize2 === "M" ? 4 : bagSize2 === "L" ? 12 : 0;

  const addValue = lastX ? baseValue * 2 : baseValue;
  const addValue2 = lastX2 ? baseValue2 * 2 : baseValue2;

  const handleLeftClick = (e) => {
    e.stopPropagation();

    if (window.innerWidth / window.innerHeight > 1) {
    } else {
      setButtonsOpen(false);
    }
  };

  const angles = [270, 330, 30, 90, 150, 210];
  const keys = ["H", "A", "B", "S", "D", "C"];

  const points = angles.map((deg, i) => {
    const key = keys[i];
    const ratio = ev[key] / 252;
    const r = 10 + 90 * ratio;
    const rad = (deg * Math.PI) / 180;

    return [r * Math.cos(rad), r * Math.sin(rad)];
  });

  const pointString = points.map((p) => p.join(",")).join(" ");
  const bgPoints = `
  0,-9
  7.794,-4.5
  7.794,4.5
  0,9
  -7.794,4.5
  -7.794,-4.5
`;

  const handleRightClick = (e) => {
    e.stopPropagation();

    if (!shake && !fly && !drop && !hit && finalHit == 0) {
      setTackleNum(0);
      setLastX(false);
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
      }, 100);
    }
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
    if (buttonsOpen && !isSerectTag) {
      if (!shake && !fly && !drop && !hit && finalHit == 0) {
        if (
          (bagSize == "S" && tackleNum == 9) ||
          (bagSize == "M" && tackleNum == 24) ||
          (bagSize == "L" && tackleNum == 49)
        ) {
          setTackleNum(0);
          const rand = Math.floor(Math.random() * 3) + 1;

          setFinalHit(rand);
          setFinalShake(rand);

          const waitTime = rand === 3 ? 500 : 1230;
          setTimeout(() => {
            setFinalShake(false);
            setFly(true);
            setBagSize2(bagSize);
            setBagType2(bagType);
            setLastX2(lastX);
            setTimeout(() => {
              setFly(false);
              setDrop(true);
              setZigOn(true);
              setEv((prev) => {
                if (bagType === "X") {
                  return prev;
                }

                return {
                  ...prev,
                  [bagType]: prev[bagType] + addValue,
                  total: prev.total + addValue,
                };
              });

              if (bagType === "X") {
                setLastX(true);
              } else {
                setLastX(false);
              }

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
              setTimeout(() => {
                setZigOn(false);
              }, 3000);
            }, 800);
          }, waitTime);

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
      setIsSerectTag(false);
    }
  };
  const clickTag = (e) => {
    e.stopPropagation();
    setIsSerectTag(true);
  };
  const handleTagClick = (value, e) => {
    e.stopPropagation();
    setTag(value);
    setIsSerectTag(false);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setUserImage(url);
    setImageName(file.name.replace(/\.[^/.]+$/, ""));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        className={`bag ${shake ? "shake" : ""} ${finalShake == 2 ? "final-shake2" : ""}${finalShake == 3 ? "final-shake3" : ""} ${fly ? "fly" : ""} ${drop ? "drop" : ""}`}
      />
      <div
        className={`user-image-wrapper 
                 ${hit ? "hit" : ""}  
                 ${finalHit == 1 ? "final-hit1" : ""}
                 ${finalHit == 2 ? "final-hit2" : ""}
                 ${finalHit == 3 ? "final-hit3" : ""}
                 ${idle ? "idle" : ""}
                 ${idleLast ? "idle-last" : ""}`}
      >
        <img
          src={userImage}
          className={`user-image 
                 ${finalHit == 1 ? "final-hit1" : ""}
                 ${finalHit == 2 ? "final-hit2" : ""}
                 ${finalHit == 3 ? "final-hit3" : ""}
                 ${idleLast ? "idle-last-tilt" : ""}`}
        />
      </div>
      <img
        src={hado}
        className={`hado1 ${shake ? "shake1" : ""}
                 ${finalHit == 1 ? "final-hit1" : ""}
                 ${finalHit == 3 ? "final-hit3" : ""}`}
      />
      <img src={hado} className={`hado2 ${shake ? "shake2" : ""}`} />
      <img
        src={hado}
        className={`hado3 ${shake ? "shake3" : ""}
                 ${finalHit == 3 ? "final-hit3" : ""}`}
      />
      <img
        src={hado}
        className={`hado4
                 ${finalHit == 2 ? "final-hit2" : ""}`}
      />
      <img src={he} className="he landscape" />
      <svg className="hex-meter landscape" viewBox="-100 -100 200 200">
        <polygon points={pointString} className="hex-fill" />
        <polygon points={bgPoints} className="hex-bg" />
      </svg>

      <div className="gauge">
        {isSerectTag ? (
          <>
            <div
              className="tag tag1 portrait"
              onClick={(e) => handleTagClick("合計", e)}
            >
              合計
            </div>
            <div
              className="tag tag2 color-hp portrait"
              onClick={(e) => handleTagClick("HP", e)}
            >
              HP
            </div>
            <div
              className="tag tag3 color-atk portrait"
              onClick={(e) => handleTagClick("攻撃", e)}
            >
              攻撃
            </div>
            <div
              className="tag tag4 color-def portrait"
              onClick={(e) => handleTagClick("防御", e)}
            >
              防御
            </div>
            <div
              className="tag tag5 color-spa portrait"
              onClick={(e) => handleTagClick("特攻", e)}
            >
              特攻
            </div>
            <div
              className="tag tag6 color-spd portrait"
              onClick={(e) => handleTagClick("特防", e)}
            >
              特防
            </div>
            <div
              className="tag tag7 color-spe portrait"
              onClick={(e) => handleTagClick("素早さ", e)}
            >
              素早さ
            </div>
          </>
        ) : (
          <div
            className={`tag tag1 portrait ${getColorClass(tag)}`}
            onClick={clickTag}
          >
            {tag}
          </div>
        )}
        <img src={gauge} className="frame" />

        <div className="bar" style={{ height: `${percentage}%` }} />
      </div>
      {idleLast && <img src={exM} className="ex-mark" />}

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

      <div className="pokemon-name">{imageName}</div>

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
      {zigOn && bagType2 != "X" && (
        <div className="zig">
          {bagType2}+{addValue2}
        </div>
      )}
    </div>
  );
}

export default App;

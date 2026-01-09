import { useState } from "react";
import logo from "../../../../folder_violet_open_icon.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [dir, setDir] = useState("");
  const [imgs, setImgs] = useState([""]);
  const [disabledInputs, setDisabledInputs] = useState({y: true, m: false})
  const [isChecked, setIsChecked] = useState({y: true, m: false})
  const listImagesFromFolder = async () => {
    const _dir = await window.electron.selectFolder();
    if (_dir) {
      console.log(_dir[0]);
      setDir(_dir[0]);
      const res = await window.electron.listImagesFromFolder(_dir[0]);
      setCount(res.length);
      setImgs(res);
    }
  };
  
  const handleOnChangeCheckbox = () => {
    const y = document.querySelector("#filterBtnYear") as HTMLInputElement;
    const m = document.querySelector("#filterBtnMonth") as HTMLInputElement;

    console.log([y.checked, m.checked])
    
    if(y.checked && m.checked) {
      setDisabledInputs({...{y: false, m: false}});
      setIsChecked({...{y: true, m: true}});
      return;
    }
    
    if(y.checked && !m.checked) {
      setDisabledInputs({...{y: true, m: false}});
      setIsChecked({...{y: true, m: false}});
      return;
    }
    
    setDisabledInputs({...{y: false, m: true}});
    setIsChecked({...{y: false, m: true}});
    return;

  }

  return (
    <>
      <div className="App">
        <header>
          <p>Image Folderer</p>
          <div className="buttons">
            <button
              id="minimize"
              onClick={() => window.electron.sendFrameAction("MINIMIZE")}
            >
              —
            </button>
            <button
              id="close"
              onClick={() => window.electron.sendFrameAction("CLOSE")}
            >
              ✕
            </button>
          </div>
        </header>
      </div>
      <main>
        <h1>Image folderer</h1>
        <div className="content">
          <div className="left">
            <img src={logo} className="logo react" alt="app logo" />
            <div className="options">
              <p>Filtrer par:</p>
              <div className="filters">
                <input
                  type="checkbox"
                  name="filterBtnYear"
                  id="filterBtnYear"
                  onChange={() => handleOnChangeCheckbox()}
                  disabled={disabledInputs.y}
                  checked={isChecked.y}
                  />
                <label htmlFor="filterBtnYear">Année</label>
                <input
                  type="checkbox"
                  name="filterBtnMonth"
                  id="filterBtnMonth"
                  disabled={disabledInputs.m}
                  checked={isChecked.m}
                  onChange={() => handleOnChangeCheckbox()}
                />
                <label htmlFor="filterBtnMonth">Mois</label>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="card">
              <button className="dirBtn" onClick={() => listImagesFromFolder()}>
                {dir ? dir : "Choisir un dossier"}
              </button>
              <p>{count} images detectées</p>
              <button
                onClick={async () => {
                  await window.electron.setEnvVariables([
                    {name: "FILTER_BY_YEAR", value: isChecked.y},
                    {name: "FILTER_BY_MONTH", value: isChecked.m}
                  ]);
                  await window.electron.filterFolderImages({ dir, imgs })
                }
                }
                disabled={dir && count ? false : true}
              >
                Filter folder images !
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

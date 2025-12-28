import { useState } from "react";
import logo from "../../../../folder_violet_open_icon.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [dir, setDir] = useState("");
  const [imgs, setImgs] = useState([""]);
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
          </div>
          <div className="right">
            <div className="card">
              <button className="dirBtn" onClick={() => listImagesFromFolder()}>
                {dir ? dir : "Choisir un dossier"}
              </button>
              <p>{count} images detectées</p>
              <button
                onClick={() =>
                  window.electron.filterFolderImages({ dir, imgs })
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

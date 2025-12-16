import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import './App.css'

// Source - https://stackoverflow.com/a
// Posted by rowinbot, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-16, License - CC BY-SA 4.0

declare module 'react' {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    // extends React's HTMLAttributes
    directory?: string;
    webkitdirectory?: string;
  }
}


function App() {
  const [count, setCount] = useState(0)
  const [dir, setDir] = useState("");
  const [imgs, setImgs] = useState([""]);
  const listImagesFromFolder = async () => {
    const _dir = await window.electron.selectFolder();
      if(_dir){
        console.log(_dir[0])
        setDir(_dir[0])
        const res = await window.electron.listImagesFromFolder(_dir[0]);
        setCount(res.length);
        setImgs(res);
      }
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={ () => listImagesFromFolder()}>
          {dir}
        </button>
        <p>{count} images detected</p>
        <button onClick={() => window.electron.filterFolderImages({dir, imgs})}>Filter folder images !</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

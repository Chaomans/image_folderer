import {app, BrowserWindow} from "electron";
import path from "path";
import { ipcHandle, isDev, listImagesData, listImagesFromFolder } from "./utils.js";
import { getPreloadPath } from "./pathResolver.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath()
        }
    });
    if (isDev()) {
        mainWindow.loadURL("http://localhost:5321");
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }
    ipcHandle("listImagesFromFolder", listImagesFromFolder, 'C:\\Code\\image_folderer')
    ipcHandle("listImagesData", listImagesData, {dir: "C:\\Users\\chaom\\Pictures\\Anniv Pao", imgs: ["_E245421.JPG"]})
})
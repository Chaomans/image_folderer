import {app, BrowserWindow, ipcMain} from "electron";
import path from "path";
import { isDev, listImagesData, listImagesFromFolder } from "./utils.js";
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
    ipcMain.handle("listImagesFromFolder", () => {
        return listImagesFromFolder('C:\\Code\\image_folderer');
    })
    ipcMain.handle("listImagesData", () => {
        return listImagesData('C:\\Code\\image_folderer', ["folder_violet_open_icon.png"]);
    })
})
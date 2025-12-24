import {app, BrowserWindow, dialog} from "electron";
import { ipcHandle, isDev} from "./utils.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { filterFolderImages, listImagesFromFolder } from "./images.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
        frame: false,
    });
    if (isDev()) {
        mainWindow.loadURL("http://localhost:5321");
    } else {
        mainWindow.loadFile(getUIPath());
    }
    ipcHandle("listImagesFromFolder", listImagesFromFolder);
    ipcHandle("filterFolderImages", filterFolderImages);
    ipcHandle("selectFolder", () => {
        return dialog.showOpenDialogSync({
            properties: ['openDirectory']
        })
    });
})
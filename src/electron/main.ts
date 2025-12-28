import { app, BrowserWindow, dialog } from "electron";
import { ipcHandle, ipcMainOn, isDev } from "./utils.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { filterFolderImages, listImagesFromFolder } from "./images.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
        frame: false,
        width: 600,
        height: 350,
        maxHeight: 350,
        maxWidth: 850,
        minHeight: 350,
        minWidth: 600
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
    ipcMainOn("sendFrameAction", (payload) => {
        switch (payload) {
            case "CLOSE":
                mainWindow.close()
                break;
            case "MINIMIZE":
                mainWindow.minimize()
                break;
            default:
                break;
        }
    })
})
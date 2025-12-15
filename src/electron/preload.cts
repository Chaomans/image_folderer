const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
    subscribeDir: (callback: (dir: string) => void) => callback(""),
    listImagesFromFolder: () => electron.ipcRenderer.invoke("listImagesFromFolder"),
    listImagesData: () => electron.ipcRenderer.invoke("listImagesData")
})
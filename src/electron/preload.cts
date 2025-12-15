const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
    subscribeDir: (callback) => callback(""),
    listImagesFromFolder: () => electron.ipcRenderer.invoke("listImagesFromFolder"),
    listImagesData: () => electron.ipcRenderer.invoke("listImagesData")
} satisfies Window["electron"] )
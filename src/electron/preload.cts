const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
    subscribeDir: (callback) => callback(""),
    listImagesFromFolder: () => ipcInvoke("listImagesFromFolder"),
    listImagesData: () => ipcInvoke("listImagesData")
} satisfies Window["electron"] )

const ipcInvoke = <Key extends keyof EventPayloadMapping>(key: Key): EventPayloadMapping[Key] => {
    return electron.ipcRenderer.invoke(key);
}
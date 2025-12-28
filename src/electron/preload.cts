const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
    subscribeDir: (callback) => callback(""),
    listImagesFromFolder: (arg) => ipcInvoke("listImagesFromFolder", arg),
    filterFolderImages: async (arg) => ipcInvoke("filterFolderImages", arg),
    selectFolder: () => ipcInvoke("selectFolder", []),
    sendFrameAction: (payload) => ipcSend("sendFrameAction", payload)
} satisfies Window["electron"])

const ipcInvoke = <Key extends keyof EventPayloadMapping | keyof EventPayloadArgsMapping>(key: Key, arg: EventPayloadArgsMapping[Key]): Promise<EventPayloadMapping[Key]> => {
    return electron.ipcRenderer.invoke(key, arg);
}

const ipcSend = <Key extends keyof EventPayloadMapping>(key: Key, payload: EventPayloadMapping[Key]) => {
    electron.ipcRenderer.send(key, payload);
}
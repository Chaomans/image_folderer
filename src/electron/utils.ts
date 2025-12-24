import { ipcMain, type WebFrameMain} from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";
import { readFileSync, writeFileSync } from "fs";
import envVars from "./data/preferences.json" with { type: "json" };


export function isDev(): boolean {
    return process.env.NODE_ENV === "development";
}

export const ipcHandle = <Key extends keyof EventPayloadMapping | keyof EventPayloadArgsMapping>(
    key: Key, 
    handler: (arg: EventPayloadArgsMapping[Key]) => EventPayloadMapping[Key]
) => {
    ipcMain.handle(key, (event, arg) => {
        if(!event.senderFrame) { throw new Error("No frame.")}
        validateEventFrame(event.senderFrame);
        return handler(arg)
    });
}

export const validateEventFrame = (frame: WebFrameMain) => {
    if(isDev() && new URL(frame.url).host === "localhost:5321"){
        return;
    }

    if(frame.url !== pathToFileURL(getUIPath()).toString()){
        throw new Error("Malicious event")
    }
}


export const setEnvVariables = (vars: EnvVariable[]): void => {
    vars.forEach(v => {
        envVars[v.name] = v.value;
    })
}

export const getEnvVariables = (): EnvVariables => {
    return {...envVars};
}

export const saveEnvVariables = (): void => {
    writeFileSync("./data/preferences.json", JSON.stringify({...envVars}));
}
import { readdirSync } from "fs";
import mime from "mime";
import { join } from "path/posix";

export const listImagesFromFolder = (dir: string): string[] => {
    const files = readdirSync(dir);
    const media = files.filter(file => {
        const typ = mime.getType(join(...[dir, file])) ?? "./.";
        if (isMedia(typ)) {
            return true
        }
        return false
    })
    return media
}

const isImage = (fileType: string): boolean => {
    return fileType.split("/")[0] === "image";
}

const isVideo = (fileType: string): boolean => {
    return fileType.split("/")[0] === "video";
}

const isMedia = (fileType: string): boolean => {
    return isImage(fileType) || isVideo(fileType);
}


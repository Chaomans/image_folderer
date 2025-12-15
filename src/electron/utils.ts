import { existsSync, readdirSync } from "fs";
import mime from "mime";
import { join } from "path/posix";
import { ImageExifData } from "../../types.js";
import ExifReader from 'exifreader';
import path from "path";


export function isDev(): boolean {
    return process.env.NODE_ENV === "development";
}

export const listImagesFromFolder = (dir: string): string[] => {
    console.log(`dir: ${dir}`);
    console.log(`exists: ${existsSync(dir)}`);
    const files = readdirSync(dir);
    const media = files.filter(file => {
        const typ = mime.getType(join(...[dir, file])) ?? "./.";
        if (isImage(typ)) {
            console.log([typ, file])
            return true
        }
        return false
    })
    console.log(media)
    return media
}

const isImage = (fileType: string): boolean => {
    return fileType.split("/")[0] === "image";
}

// const isVideo = (fileType: string): boolean => {
//     return fileType.split("/")[0] === "video";
// }

// const isMedia = (fileType: string): boolean => {
//     return isImage(fileType) || isVideo(fileType);
// }

const getImageDateTimeOriginal = async (imgPath: string): Promise<ImageExifData> => {
    const tags = await ExifReader.load(imgPath);
    const date = new Date();
    const dto = tags.DateTimeOriginal?.description ?? `${date.getFullYear()}:${date.getMonth()}`;
    return {
        path: imgPath,
        name: path.basename(imgPath),
        year: parseInt(dto.split(":")[0]),
        month: parseInt(dto.split(":")[1]) + 1,
    }
} 

export const listImagesData = async (dir: string, imgs: string[]): Promise<ImageExifData[]> => {
    const data: ImageExifData[] = []
    for (let i = 0; i < imgs.length; i++) {
        const dto = await getImageDateTimeOriginal(path.join(dir, imgs[i]))
        data.push(dto);
    }
    return [...data];
}
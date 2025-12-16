import { existsSync, mkdirSync, readdirSync, renameSync } from "fs";
import mime from "mime";
import path, { join } from "path";
import ExifReader from 'exifreader';
import { getEnvVariables } from "./utils.js";
import { pathToFileURL } from "url";

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
    const dto = tags.DateTimeOriginal?.description ?? `${date.getFullYear()}:${date.getMonth() + 1}`;
    return {
        dir: path.dirname(imgPath),
        name: path.basename(imgPath),
        year: parseInt(dto.split(":")[0]),
        month: parseInt(dto.split(":")[1]),
    }
} 

const listImagesData = async ({dir, imgs}: ImageList): Promise<ImageExifData[]> => {
    const data: ImageExifData[] = []
    for (let i = 0; i < imgs.length; i++) {
        const dto = await getImageDateTimeOriginal(path.join(dir, imgs[i]))
        data.push(dto);
    }
    return [...data];
}

const getNewDir = (year: number, month: number, {FRENCH, FILTER_BY_YEAR, FILTER_BY_MONTH, MONTH_SHORT}: EnvVariables) => {
    if(FILTER_BY_YEAR && FILTER_BY_MONTH) {
        return path.join(".", year.toString(), `${month} - ${months[FRENCH ? "fr" : "us"][MONTH_SHORT ? "short" : "full"][month -1]}`)
    }
    if(FILTER_BY_YEAR) {
        return path.join(".", year.toString())
    }
    return path.join(".", `${year.toString()}.${month} ${months[FRENCH ? "fr" : "us"][MONTH_SHORT ? "short" : "full"][month -1]}`)
}

const months = {
    fr: {
        full: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
        short: ["janv.", "fév.", "mars", "avr.", "mai", "juin", "juill", "août", "sept.", "oct.", "nov.", "déc."]
    },
    us: {
        full: ["january", "february", "mars", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
        short: ["jan.", "fev.", "mar.", "apr.", "may", "jun.", "jul.", "aug.", "sep.", "oct.", "nov.", "dec."]
    }
}

const moveImage = ({dir, name, month, year}: ImageExifData, envVars: EnvVariables): void => {
    console.log(dir);
    const newDir = path.join(dir,
        getNewDir(year, month, envVars));

    console.log(newDir)

    if(!existsSync(newDir)) {
        mkdirSync(newDir, {recursive: true});
    }
    renameSync(path.join(dir, name), path.join(newDir, name))
    console.log(`${name} moved.`);
}

const moveImages = (imgs: ImageExifData[]): void => {
    const envVars = getEnvVariables();
    imgs.forEach(img => {
        moveImage(img, envVars);
    })
}

export const filterFolderImages = async (imgs: ImageList): Promise<void> => {
    const imgsData = await listImagesData(imgs);
    moveImages(imgsData)
    console.info("Folder filtered !")
}
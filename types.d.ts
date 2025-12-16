type ImageExifData = {
    name: string,
    dir: string,
    year: number,
    month: number,
}

type ImageList = {
    dir: string,
    imgs: string[]
}

interface Window {
    electron: {
        subscribeDir: (callback: (dir: string) => void) => void,
        listImagesFromFolder: (arg: string) => Promise<string[]>,
        filterFolderImages: (arg: ImageList) => Promise<void>,
        selectFolder: () => Promise<string[] | undefined>
    }
}

type EventPayloadMapping = {
    listImagesFromFolder: string[],
    filterFolderImages: Promise<void>,
    selectFolder: string[] | undefined
}

type EventPayloadArgsMapping = {
    listImagesFromFolder: string,
    filterFolderImages: ImageList,
    selectFolder: string[] | undefined
}

type EnvVariables = {
    FRENCH: boolean,
    FILTER_BY_YEAR: boolean,
    FILTER_BY_MONTH: boolean,
    MONTH_SHORT: boolean
}

type envKey = keyof EnvVariables;

type EnvVariable = {
    name: envKey,
    value: boolean;
}


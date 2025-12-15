type ImageExifData = {
    name: string,
    path: string,
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
        listImagesFromFolder: () => string[],
        listImagesData: () => Promise<ImageExifData[]>
    }
}

type EventPayloadMapping = {
    listImagesFromFolder: string[],
    listImagesData: Promise<ImageExifData[]>
}

type EventPayloadArgsMapping = {
    listImagesFromFolder: string,
    listImagesData: ImageList
}
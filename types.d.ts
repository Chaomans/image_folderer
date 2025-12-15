type ImageExifData = {
    name: string,
    path: string,
    year: number,
    month: number,
}

interface Window {
    electron: {
        subscribeDir: (callback: (dir: string) => void) => void,
        listImagesFromFolder: () => Promise<string[]>,
        listImagesData: () => Promise<ImageExifData[]>
    }
}

type EventPayloadMapping = {
    listImagesFromFolder: string[],
    listImagesData: Promise<ImageExifData[]>
}
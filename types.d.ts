type ImageExifData = {
    name: string;
    dir: string;
    year: number;
    month: number;
}

type ImageList = {
    dir: string;
    imgs: string[];
}

interface Window {
    electron: {
        subscribeDir: (callback: (dir: string) => void) => void,
        listImagesFromFolder: (arg: string) => Promise<string[]>,
        filterFolderImages: (arg: ImageList) => Promise<boolean>,
        selectFolder: () => Promise<string[] | undefined>,
        sendFrameAction: (payload: FrameWindowAction) => void,
        setEnvVariables: (arg: EnvVariable[]) => Promise<EnvVariable[]>
    }
}

type EventPayloadMapping = {
    listImagesFromFolder: string[];
    filterFolderImages: Promise<boolean>;
    selectFolder: string[] | undefined;
    sendFrameAction: FrameWindowAction;
    setEnvVariables: Promise<EnvVariable[]>;
}

type EventPayloadArgsMapping = {
    listImagesFromFolder: string;
    filterFolderImages: ImageList;
    selectFolder: string[] | undefined;
    sendFrameAction: FrameWindowAction;
    setEnvVariables: EnvVariable[];
}

type EnvVariables = {
    FRENCH: boolean;
    FILTER_BY_YEAR: boolean;
    FILTER_BY_MONTH: boolean;
    MONTH_SHORT: boolean;
}

type envKey = keyof EnvVariables;

type EnvVariable = {
    name: envKey;
    value: boolean;
}

type FrameWindowAction = "CLOSE" | "MINIMIZE";
declare namespace EXIF {
    type ExifData = { Orientation?: number; }
}

interface EXIFStatic {
    getData(
        input: string | Blob | File | HTMLImageElement,
        callback: (this: HTMLImageElement & { exifdata: EXIF.ExifData }) => void
    ): any;
    getTag(img: any, tag: any): any;
    getAllTags(img: any): any;
    pretty(img: any): string;
    readFromBinaryFile(file: any): any;
}

declare var EXIF : EXIFStatic;
export = EXIF;

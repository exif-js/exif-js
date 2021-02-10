interface EXIFStatic {
    getData(url: (string|HTMLImageElement|typeof Image), callback: any): Boolean;
    getTag(img: any, tag: any): any;
    getAllTags(img: any): any;
    pretty(img: any): string;
    readFromBinaryFile(file: any): any;
}

declare var EXIF : EXIFStatic;
export = EXIF;

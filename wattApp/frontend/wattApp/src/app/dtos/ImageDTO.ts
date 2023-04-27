export class ImageDTO {
    constructor(
        public id: number | null,
        public name: string,
        public contentType: string,
        public data: string
    ) { }
}
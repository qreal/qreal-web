export class Logger {
    private tag: string;

    constructor(tag: string) {
        this.tag = tag;
    }

    public log(message: string): void {
        console.log("(" + this.tag + ") " + message);
    }
}
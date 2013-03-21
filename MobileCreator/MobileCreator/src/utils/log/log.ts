export class Logger {
    private tag: string;

    constructor(tag: string) {
        this.tag = tag;
    }

    public log(message: string): void {
        var date = new Date();
        console.log("[" + date.toLocaleTimeString() + "." + date.getMilliseconds()+ "] (" + this.tag + "): " + message);
    }
}
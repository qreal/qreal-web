class Log {

    private tag: string;
    private logLevel = 1;

    constructor(tag: string) {
        this.tag = tag;
    }

    public Debug(message: string): void {
        if (this.logLevel < 1) {
            return;
        }
        var date = new Date();
        console.log("[" + date.toLocaleTimeString() + "." + date.getMilliseconds() + "] (" + this.tag + "): " + message);
    }
}

export = Log;
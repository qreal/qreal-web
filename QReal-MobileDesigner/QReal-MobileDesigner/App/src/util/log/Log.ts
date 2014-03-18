class Log {

    private tag: string;
    private logLevel = 1;

    constructor(tag: string) {
        this.tag = tag;
    }

    public Debug(message: string, obj: any = null): void {
        if (obj) {
            this.DebugObj(obj, message);
        } else {
            this.Log(message, 'log');
        }
    }

    public DebugObj(obj, tag = "Object: "): void {
        if (this.logLevel < 1) {
            return;
        }
        this.Debug(tag + String.fromCharCode(9660));
        console.log(obj);
    }

    public Error(message: string): void {
        this.Log(message, 'error');
    }

    public Warn(message: string): void {
        this.Log(message, 'warn');
    }

    private Log(message: string, method: string): void {
        if (this.logLevel < 1) {
            return;
        }
        var date = new Date();
        console[method]("[" + date.toLocaleTimeString() + "." + date.getMilliseconds() + "] (" + this.tag + "): " + message);
    }
}

export = Log;
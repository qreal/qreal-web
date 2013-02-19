module Log {
    export class LogManager {
        private tag: string;

        constructor(tag: string) {
            this.tag = tag;
        }

        log(message: string): void {
            console.log("(" + this.tag + ") " + message);
        }
    }
}
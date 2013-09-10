import gt = require("app/classes/Greeter");

export class App {
    public static Main(): void {
        // code from window.onload
        var el = document.getElementById('content');
        var greeter = new gt.Greeter(el);
        greeter.start();
    }
}
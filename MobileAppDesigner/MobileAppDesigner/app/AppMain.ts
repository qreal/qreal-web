import Controlller = require("app/classes/Controller");

class App {

    public static Main(): void {
        Controlller.Instance.Init();
        //var ct = new Controlller();
        //ct.Init();
    }
}

export = App;
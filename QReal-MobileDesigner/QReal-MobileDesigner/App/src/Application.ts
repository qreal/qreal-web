import Log = require("src/util/log/Log");
import Device = require("src/device/Device");
import Designer = require("src/designer/Designer");

class Application {

    private static log = new Log('Application');

    private static instance: Application = null;

    public static get Instance(): Application {
        Application.log.Debug('Get Instance');
        if (!Application.instance) {
            Application.log.Debug('Instance is null. Create new');
            Application.instance = new Application();
        }
        return Application.instance;
    }

    public static set Instance(value: Application) {
        Application.log.Debug('Set Instance');
        Application.instance = value;
    }

    private device: Device = null;

    public get Device(): Device {
        return this.device;
    }

    public set Device(value: Device) {
        this.device = value;
    }

    private designer: Designer = null;

    public get Designer(): Designer {
        return this.designer;
    }

    public set Designer(value: Designer) {
        this.designer = value;
    }

}
export = Application;
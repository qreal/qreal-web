import DeviceController = require("src/device/DeviceController");
import DesignerController = require("src/designer/Controller");

class Application{

    private static deviceController: DeviceController = null;

    public static get DeviceController(): DeviceController{
        return this.deviceController;
    }

    public static set DeviceController(value: DeviceController) {
        this.deviceController = value;
    }

    private static designerController: DesignerController = null;

    public static get DesignerController(): DesignerController {
        return this.designerController;
    }

    public static set DesignerController(value: DesignerController) {
        this.designerController = value;
    }


}
export = Application;
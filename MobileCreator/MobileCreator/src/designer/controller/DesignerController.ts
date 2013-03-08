import mDesignerModel = module("designer/model/DesignerModel");
import mDesignerView = module("designer/view/DesignerView");

export class DesignerController {
    private model: mDesignerModel.DesignerModel = null;
    private view: mDesignerView.DesignerView = null;

    constructor(model: mDesignerModel.DesignerModel, view?: mDesignerView.DesignerView) {
        this.model = model;
        this.view = view || null;
    }

    set View(view: mDesignerView.DesignerView) {
        this.view = view;
    }
}
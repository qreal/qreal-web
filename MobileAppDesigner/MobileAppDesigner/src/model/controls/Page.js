var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/Application", "src/util/log/Log", "src/model/properties/PageProperty", "src/model/controls/BaseContainer"], function(require, exports, App, Log, PageProperty, BaseContainer) {
    var Page = (function (_super) {
        __extends(Page, _super);
        function Page(id) {
            _super.call(this, new PageProperty(id));
            this.log = new Log("Page");
        }
        Page.prototype.OnDrop = function (event) {
            this.log.Debug("OnDrop, event: ", event);
            event.preventDefault();
            var controlId = event.originalEvent.dataTransfer.getData("Text");
            var control = App.Instance.Device.ControlManager.CreateControl(controlId);
            this.Childrens.push(control);
            this.Element.append(control.Element);

            //control.Element.trigger('create');
            $('#' + this.Properties.Id).trigger('create');
        };

        Page.prototype.OnDragOver = function (e) {
            //this.log.Debug("OnDragOver");
            e.preventDefault();
        };
        return Page;
    })(BaseContainer);

    
    return Page;
});
//# sourceMappingURL=Page.js.map

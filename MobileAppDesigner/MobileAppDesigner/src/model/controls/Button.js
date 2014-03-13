var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "src/Application", "src/util/log/Log", "src/model/properties/ButtonProperty", "src/model/controls/BaseControl"], function(require, exports, App, Log, ButtonProperty, BaseControl) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(id) {
            _super.call(this, new ButtonProperty(id));
            this.log = new Log("Button");
        }
        Button.prototype.Create = function () {
            this.log.Debug("Create");
            return $("");
        };

        Button.prototype.CreateForDesigner = function () {
            var _this = this;
            this.log.Debug("CreateForDesigner");
            var bt = $('<a href="#"></a>');
            bt.data('role', 'button');
            bt.attr('id', this.Properties.Id);
            bt.text(this.Properties.Text);
            $(event.currentTarget).append(bt);

            bt.on('click', function (event) {
                _this.log.Debug('bt click');
                App.Instance.Designer.ShowProperty($(event.target).data('prop'));
            });

            bt = bt.button();
            bt.children('.ui-btn-inner').data('prop', this.Properties);
            return bt;
        };
        return Button;
    })(BaseControl);
});
//# sourceMappingURL=Button.js.map

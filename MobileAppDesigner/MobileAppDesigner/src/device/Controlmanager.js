define(["require", "exports", "src/Application", "src/util/log/Log", "src/util/events/EventManager", "src/properties/Property", "src/properties/ButtonProperty"], function(require, exports, __App__, __Log__, __EventManager__, __Property__, __ButtonProperty__) {
    var App = __App__;
    var Log = __Log__;
    
    var EventManager = __EventManager__;
    
    var Property = __Property__;
    var ButtonProperty = __ButtonProperty__;

    var ControlManager = (function () {
        function ControlManager() {
            this.log = new Log("ControlManager");
            this.idIndex = 1;
            this.idList = [];
            this.propertiesMap = [];
            this.log.Debug("constructor");
        }
        ControlManager.prototype.Init = function () {
            this.log.Debug("Init");
            App.Instance.Device.EventManager.AddSubscriber(EventManager.EventPropertiesChanged, new PropertyChangeListener(this));
        };

        ControlManager.prototype.CreateControl = function (controlId) {
            this.log.Debug("CreateControl: " + controlId);
            this['Create' + controlId]();
        };

        ControlManager.prototype.CreateButton = function () {
            var _this = this;
            var bt = $('<a href="#" data-role="button"></a>');
            var prop = new ButtonProperty(this.GetNewId());

            bt.attr('id', prop.Id);
            bt.text(prop.Text);
            this.propertiesMap[prop.Id] = prop;
            $(event.currentTarget).append(bt);

            bt.on('click', function (event) {
                _this.log.Debug('bt click');
                _this.log.DebugObj($(event.target));
                _this.log.DebugObj($(event.target).data('prop'));
                App.Instance.Device.EventManager.Trigger(EventManager.EventShowProperties, $(event.target).data('prop'));
            });

            var bt = bt.button();
            bt.children('.ui-btn-inner').data('prop', prop);
        };

        ControlManager.prototype.GetNewId = function () {
            var id = 'id' + this.idIndex++;
            if (this.ContainsId(id)) {
                this.log.Warn('id: ' + id + ' already exists');
                id = 'id' + this.idIndex++;
            }
            this.idList.push(id);
            return id;
        };

        ControlManager.prototype.ContainsId = function (id) {
            return this.idList.indexOf(id) > 0;
        };

        ControlManager.prototype.ChangeId = function (id, newId) {
            this.log.Debug("ChangeId, id=" + id + ", newId=" + newId);

            this.idList.push(newId);
            delete this.idList[this.idList.indexOf(id)];
            this.propertiesMap[newId] = this.propertiesMap[id];
            this.propertiesMap[newId].Id = newId;
            delete this.propertiesMap[id];
        };

        ControlManager.prototype.CreatePage = function (pageId) {
            var _this = this;
            this.log.Debug("CreatePage: " + pageId);
            var newPage = $('<div data-role="page"></div>');
            newPage.attr('id', pageId);
            newPage.on('drop', function (event) {
                return _this.OnDrop(event);
            });
            newPage.on('dragover', function (event) {
                return _this.OnDragOver(event);
            });
            $('body').append(newPage);
        };

        ControlManager.prototype.SelectPage = function (pageId) {
            this.log.Debug("SelectPage: " + pageId);
            $.mobile.changePage('#' + pageId);
        };

        ControlManager.prototype.OnDrop = function (event) {
            this.log.Debug("OnDrop, event: ", event);
            event.preventDefault();
            var controlId = event.originalEvent.dataTransfer.getData("ControlId");
            this.CreateControl(controlId);
        };

        ControlManager.prototype.OnDragOver = function (e) {
            //this.log.Debug("OnDragOver");
            e.preventDefault();
        };
        return ControlManager;
    })();

    var PropertyChangeListener = (function () {
        function PropertyChangeListener(controlManager) {
            this.log = new Log("PropertyChangeListener");
            this.controlManager = null;
            this.controlManager = controlManager;
        }
        PropertyChangeListener.prototype.OnEvent = function (data) {
            this.log.Debug("OnEvent, data: ", data);
            this.log.DebugObj(data);
            if (data.newId) {
                if (this.controlManager.ContainsId(data.newId)) {
                    //TODO: show notification
                    alert('Id already exists');
                } else {
                    $('#' + data.id).attr('id', data.newId);
                    this.controlManager.ChangeId(data.id, data.newId);
                }
            }
            if (data.text) {
                $('#' + data.id).children('.ui-btn-inner').children('.ui-btn-text').text(data.text);
            }
            if (data.inline) {
                var cond = data.inline == "true";
                $('#' + data.id).buttonMarkup({ inline: cond });
            }
            if (data.corners) {
                var cond = data.corners == "true";
                $('#' + data.id).buttonMarkup({ corners: cond });
            }
            if (data.mini) {
                var cond = data.mini == "true";
                $('#' + data.id).buttonMarkup({ mini: cond });
            }
            if (data.theme) {
                $('#' + data.id).buttonMarkup({ theme: data.theme });
            }
        };
        return PropertyChangeListener;
    })();

    
    return ControlManager;
});
//# sourceMappingURL=ControlManager.js.map

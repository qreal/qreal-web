define(["require", "exports", "src/Application", "src/util/log/Log", "src/properties/ButtonProperty"], function(require, exports, App, Log, ButtonProperty) {
    var ControlManager = (function () {
        function ControlManager() {
            this.log = new Log("ControlManager");
            this.idIndex = 1;
            this.idList = [];
            this.propertiesMap = [];
            this.log.Debug("constructor");
        }
        ControlManager.prototype.Init = function () {
            var _this = this;
            this.log.Debug("Init");

            //this.CreatePage("MainPage");
            $("#MainPage").on('drop', function (event) {
                return _this.OnDrop(event);
            });
            $("#MainPage").on('dragover', function (event) {
                return _this.OnDragOver(event);
            });
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
                App.Instance.Designer.ShowProperty($(event.target).data('prop'));
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
            if (this.ContainsId(pageId)) {
                //TODO: show notification
                alert('Id already exists');
                return false;
            }
            this.idList.push(pageId);
            var newPage = $('<div data-role="page"></div>');
            newPage.attr('id', pageId);
            newPage.on('drop', function (event) {
                return _this.OnDrop(event);
            });
            newPage.on('dragover', function (event) {
                return _this.OnDragOver(event);
            });
            $('body').append(newPage);
            this.SelectPage(pageId);
            return true;
        };

        ControlManager.prototype.SelectPage = function (pageId) {
            this.log.Debug("SelectPage: " + pageId);
            $.mobile.changePage('#' + pageId);
        };

        ControlManager.prototype.OnDrop = function (event) {
            this.log.Debug("OnDrop, event: ", event);
            event.preventDefault();
            var controlId = event.originalEvent.dataTransfer.getData("Text");
            this.CreateControl(controlId);
        };

        ControlManager.prototype.OnDragOver = function (e) {
            //this.log.Debug("OnDragOver");
            e.preventDefault();
        };

        ControlManager.prototype.ChangeProperty = function (propertyId, propertyType, controlType, newValue) {
            this.log.Debug("OnChangeProperty, propertyId: " + propertyId + " propertyType: " + propertyType + " controlType: " + controlType + " value: " + newValue);
            switch (controlType) {
                case 0 /* Button */:
                    this.ChangeButtonProperty(propertyId, propertyType, newValue);
                    break;
            }
        };

        ControlManager.prototype.ChangeButtonProperty = function (propertyId, propertyType, newValue) {
            switch (propertyType) {
                case 1 /* Id */:
                    if (this.ContainsId(newValue)) {
                        //TODO: show notification
                        alert('Id already exists');
                    } else {
                        $('#' + propertyId).attr('id', newValue);
                        this.ChangeId(propertyId, newValue);
                    }
                    break;
                case 0 /* Text */:
                    $('#' + propertyId).children('.ui-btn-inner').children('.ui-btn-text').text(newValue);
                    break;
                case 2 /* Inline */:
                    var cond = newValue == "true";
                    $('#' + propertyId).buttonMarkup({ inline: cond });
                    break;
                case 3 /* Corners */:
                    var cond = newValue == "true";
                    $('#' + propertyId).buttonMarkup({ corners: cond });
                    break;
                case 4 /* Mini */:
                    var cond = newValue == "true";
                    $('#' + propertyId).buttonMarkup({ mini: cond });
                    break;
                case 5 /* Theme */:
                    $('#' + propertyId).buttonMarkup({ theme: newValue });
                    break;
            }
        };
        return ControlManager;
    })();

    
    return ControlManager;
});
//# sourceMappingURL=ControlManager.js.map

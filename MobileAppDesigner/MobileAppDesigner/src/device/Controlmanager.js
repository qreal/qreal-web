define(["require", "exports", "src/util/log/Log", "src/device/DesignerControlFactory", "src/model/controls/BaseContainer"], function(require, exports, Log, DesignerControlFactory, BaseContainer) {
    var ControlManager = (function () {
        function ControlManager() {
            this.log = new Log("ControlManager");
            this.idIndex = 1;
            this.pages = new Array();
            this.log.Debug("constructor");
            this.controlFactory = new DesignerControlFactory();
        }
        ControlManager.prototype.Init = function () {
            this.log.Debug("Init");
        };

        /* Pages */
        ControlManager.prototype.CreatePage = function (pageId) {
            this.log.Debug("CreatePage: " + pageId);
            if (this.ContainsId(pageId)) {
                this.log.Warn("Page id alredy exists");

                //TODO: show notification
                alert('Id already exists');
                return false;
            }

            var page = this.controlFactory.CreatePage(pageId);
            this.pages.push(page);
            $('body').append(page.Element);
            this.SelectPage(pageId);
            return true;
        };

        ControlManager.prototype.SelectPage = function (pageId) {
            this.log.Debug("SelectPage: " + pageId);
            $.mobile.changePage('#' + pageId);
        };

        /* Controls */
        ControlManager.prototype.CreateControl = function (controlId) {
            this.log.Debug("CreateControl: " + controlId);
            switch (controlId) {
                case "Button":
                    return this.CreateButton();
                case "Input":
                    return this.CreateInput();
                    break;
            }
        };

        ControlManager.prototype.CreateButton = function () {
            return this.controlFactory.CreateButton(this.GetNewId('button'));
        };

        ControlManager.prototype.CreateInput = function () {
            return this.controlFactory.CreateInput(this.GetNewId('input'));
        };

        /* Id */
        ControlManager.prototype.GetNewId = function (prefix) {
            if (typeof prefix === "undefined") { prefix = 'id'; }
            var id = prefix + this.idIndex++;
            if (this.ContainsId(id)) {
                this.log.Warn('id: ' + id + ' already exists');
                id = prefix + this.idIndex++;
            }
            return id;
        };

        ControlManager.prototype.ContainsId = function (id) {
            return this.FindById(id) != null;
        };

        ControlManager.prototype.ChangeId = function (id, newId) {
            this.log.Debug("ChangeId, id=" + id + ", newId=" + newId);

            //this.idList.push(newId);
            //delete this.idList[this.idList.indexOf(id)];
            this.FindById(id).Properties.Id = newId;
        };

        ControlManager.prototype.ChangeProperty = function (propertyId, propertyType, controlType, newValue) {
            this.log.Debug("OnChangeProperty, propertyId: " + propertyId + " propertyType: " + propertyType + " controlType: " + controlType + " value: " + newValue);
            switch (controlType) {
                case 1 /* Button */:
                    this.FindById(propertyId).ChangeProperty(propertyId, propertyType, newValue);
                    break;
                case 2 /* Input */:
                    this.ChangeInputProperty(propertyId, propertyType, newValue);
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

        ControlManager.prototype.ChangeInputProperty = function (propertyId, propertyType, newValue) {
            this.log.Debug("ChangeInputProperty");
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
                case 4 /* Mini */:
                    var cond = newValue == "true";

                    break;
                case 5 /* Theme */:
                    break;
            }
        };

        ControlManager.prototype.FindById = function (id) {
            this.log.Debug("FindById: " + id, this.pages);
            for (var i in this.pages) {
                var control = this.FindInContainer(id, this.pages[i]);
                if (control) {
                    return control;
                }
            }
            return null;
        };

        ControlManager.prototype.FindInContainer = function (id, control) {
            this.log.Debug("FindInContainer: ", control);
            if (control.Properties.Id === id) {
                return control;
            }
            if (control instanceof BaseContainer) {
                var childrens = control.Childrens;
                for (var i in childrens) {
                    var res = this.FindInContainer(id, childrens[i]);
                    if (res) {
                        return res;
                    }
                }
            }
            return null;
        };
        return ControlManager;
    })();

    
    return ControlManager;
});
//# sourceMappingURL=ControlManager.js.map

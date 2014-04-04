define(["require", "exports", "src/Application", "src/util/log/Log", "src/util/Helper", "src/model/Enums", "src/model/ControlProperty", "src/model/DesignerControls", "src/device/DesignerControlFactory", "src/device/AppControlFactory"], function(require, exports, App, Log, Helper, Enums, ControlProperty, DesignerControls, DesignerControlFactory, AppControlFactory) {
    var ControlManager = (function () {
        function ControlManager() {
            this.log = new Log("ControlManager");
            this.idIndex = 1;
            this.log.Debug("constructor");
            this.controlFactory = new DesignerControlFactory();
            this.appControlFactory = new AppControlFactory();
        }
        ControlManager.prototype.Init = function () {
            this.log.Debug("Init");
            this.app = new DesignerControls.BaseContainer(new ControlProperty.AppProperty(parent.projectName, parent.projectPackage));
            this.app.Element = $("<div></div>");
        };

        /*** Pages ***/
        ControlManager.prototype.CreatePage = function (pageId) {
            var _this = this;
            this.log.Debug("CreatePage: " + pageId);
            var self = this;
            if (this.ContainsId(pageId)) {
                this.log.Warn("Page id alredy exists");

                //TODO: show notification
                alert('Id already exists');
                return false;
            }

            var page = new DesignerControls.Page(new ControlProperty.PageProperty(pageId));
            var $page = this.controlFactory.CreatePage(page.Properties);
            $page.on('drop', function (event) {
                return _this.OnDrop(event, page);
            });
            $page.on('dragover', function (event) {
                return _this.OnDragOver(event);
            });
            this.app.Childrens.push(page);
            $('body').append($page);
            this.SelectPage(pageId);
            $('.sortcontainer').sortable({
                forcePlaceholderSize: true,
                containment: "parent",
                cancel: '.nondraggable',
                start: function (event, ui) {
                    ui.placeholder.height(ui.item.height());
                    ui.item.startPos = ui.item.index();
                },
                stop: function (e, ui) {
                    var container = self.FindById(e.target.id);
                    Helper.ArrayMove(container.Childrens, ui.item.startPos, ui.item.index());
                },
                delay: 100,
                placeholder: "ui-state-highlight"
            });

            /*
            .sortable({
            
            helper: "clone",
            axis: "y",
            
            revert: 100,
            distance: 0,
            forceHelperSize: true,
            forcePlaceholderSize: true,
            scrollSensitivity: 0,
            start: function (event, ui) {
            ui.placeholder.width(ui.helper.width());
            },
            cancel: '.nondraggable',
            stop: function (event, ui) {
            
            },
            change: function (e, ui) {
            console.log("sort called");
            },
            tolerance: "pointer"
            });
            */
            return true;
        };

        ControlManager.prototype.SelectPage = function (pageId) {
            this.log.Debug("SelectPage: " + pageId);
            $.mobile.changePage('#' + pageId);
        };

        /*** Controls ***/
        ControlManager.prototype.CreateControl = function (controlId) {
            this.log.Debug("CreateControl: " + controlId);
            switch (controlId) {
                case "Button":
                    var btProperty = new ControlProperty.ButtonProperty(this.GetNewId('button'));
                    return new DesignerControls.Button(btProperty);
                case "Input":
                    var inputProperty = new ControlProperty.InputProperty(this.GetNewId('input'));
                    return new DesignerControls.Input(inputProperty);
                case "Header":
                    break;
            }
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

        /*** Changing Property ***/
        ControlManager.prototype.ChangeProperty = function (propertyId, propertyType, controlType, newValue) {
            this.log.Debug("OnChangeProperty, propertyId: " + propertyId + " propertyType: " + propertyType + " controlType: " + controlType + " value: " + newValue);
            if (propertyType == 0 /* Id */) {
                if (this.ContainsId(newValue)) {
                    //TODO: show notification
                    alert('Id already exists');
                    return;
                }
            }

            switch (controlType) {
                case 3 /* Button */:
                    this.ChangeButtonProperty(propertyId, propertyType, newValue);
                    break;
                case 4 /* Input */:
                    this.ChangeInputProperty(propertyId, propertyType, newValue);
                    break;
                case 1 /* Page */:
                    this.ChangePageProperty(propertyId, propertyType, newValue);
                    break;
                case 2 /* Header */:
                    this.ChangeHeaderProperty(propertyId, propertyType, newValue);
                    break;
            }
        };

        ControlManager.prototype.ChangePageProperty = function (propertyId, propertyType, newValue) {
            this.log.Debug('ChangePageProperty');
            var page = this.FindById(propertyId);
            var $page = $(page.Properties.$Id);
            switch (propertyType) {
                case 7 /* Header */:
                    page.Properties.Header = newValue == 'yes';
                    if (newValue == 'yes') {
                        var headerProp = new ControlProperty.HeaderProperty(propertyId + '_header');
                        var header = new DesignerControls.Header(headerProp);
                        var $header = this.controlFactory.CreateHeader(headerProp);
                        page.Childrens.unshift(header);
                        $page.prepend($header);
                        $page.trigger('pagecreate');
                    } else {
                        $page.find('div[data-role="header"]').remove();
                        page.Childrens.splice(0, 1);
                    }
                    break;
            }
        };

        ControlManager.prototype.ChangeHeaderProperty = function (propertyId, propertyType, newValue) {
            this.log.Debug('ChangeHeaderProperty');
            var header = this.FindById(propertyId);
            var $header = $(header.Properties.$Id);
            switch (propertyType) {
                case 6 /* Title */:
                    header.Properties.Title = newValue;
                    $header.find('h1').text(newValue);
                    break;
            }
        };

        ControlManager.prototype.ChangeButtonProperty = function (propertyId, propertyType, newValue) {
            var button = this.FindById(propertyId);
            switch (propertyType) {
                case 0 /* Id */:
                    $(button.Properties.$Id).attr('id', newValue);
                    button.Properties.Id = newValue;
                    break;
                case 1 /* Text */:
                    $(button.Properties.$Id).find('.ui-btn-text').text(newValue);
                    button.Properties.Text = newValue;
                    break;
                case 2 /* Inline */:
                    var cond = newValue == "true";
                    $(button.Properties.$Id).buttonMarkup({ inline: cond });
                    button.Properties.Inline = cond;
                    break;
                case 3 /* Corners */:
                    var cond = newValue == "true";
                    $(button.Properties.$Id).buttonMarkup({ corners: cond });
                    button.Properties.Corners = cond;
                    break;
                case 4 /* Mini */:
                    var cond = newValue == "true";
                    $(button.Properties.$Id).buttonMarkup({ mini: cond });
                    button.Properties.Mini = cond;
                    break;
                case 5 /* Theme */:
                    $(button.Properties.$Id).buttonMarkup({ theme: newValue });
                    button.Properties.Theme = newValue;
                    break;
            }
        };

        ControlManager.prototype.ChangeInputProperty = function (propertyId, propertyType, newValue) {
            var input = this.FindById(propertyId);
            switch (propertyType) {
                case 0 /* Id */:
                    $(input.Properties.$Id).find('input').attr('id', newValue);
                    input.Properties.Id = newValue;
                    break;
                case 6 /* Title */:
                    $(input.Properties.$Id).parent().parent().find('label').text(newValue);
                    input.Properties.Title = newValue;
                    break;
                case 4 /* Mini */:
                    var cond = newValue == "true";
                    break;
                case 5 /* Theme */:
                    break;
            }
        };

        /*** Generation App ***/
        ControlManager.prototype.GenerateAppHtml = function () {
            return this.GenerateHtml(this.app).html();
        };

        ControlManager.prototype.GenerateHtml = function (element) {
            var $html;
            switch (element.Properties.Type) {
                case 0 /* App */:
                    $html = this.appControlFactory.CreateApp(element.Properties);
                    var app = element;
                    for (var i in app.Childrens) {
                        $html.append(this.GenerateHtml(app.Childrens[i]));
                    }
                    break;
                case 1 /* Page */:
                    var page = element;
                    $html = this.appControlFactory.CreatePage(page.Properties);
                    for (var i in page.Childrens) {
                        $html.append(this.GenerateHtml(page.Childrens[i]));
                    }
                    break;
                case 3 /* Button */:
                    var button = element;
                    $html = this.appControlFactory.CreateButton(button.Properties);
                    break;
                case 4 /* Input */:
                    var input = element;
                    $html = this.appControlFactory.CreateInput(input.Properties);
                    break;
                case 2 /* Header */:
                    var header = element;
                    $html = this.appControlFactory.CreateHeader(header.Properties);
                    break;
            }
            return $html;
        };

        ControlManager.prototype.Serialize = function () {
            var obj = this.AppToSerializeObj(this.app);
            return JSON.stringify(obj, null, 4);
        };

        ControlManager.prototype.AppToSerializeObj = function (element) {
            var obj;
            var self = this;
            switch (element.Properties.Type) {
                case 0 /* App */:
                    obj = element.Properties;
                    var app = element;
                    obj["Pages"] = [];
                    app.Childrens.forEach(function (el) {
                        obj["Pages"].push(self.AppToSerializeObj(el));
                    });
                    break;
                case 1 /* Page */:
                    obj = element.Properties;
                    var page = element;
                    obj["Controls"] = [];
                    page.Childrens.forEach(function (el) {
                        obj["Controls"].push(self.AppToSerializeObj(el));
                    });
                    break;
                case 3 /* Button */:
                case 4 /* Input */:
                case 2 /* Header */:
                    obj = element.Properties;
                    break;
            }
            return obj;
        };

        ControlManager.prototype.OnDrop = function (event, page) {
            this.log.Debug("OnDrop, event: ", event);
            event.preventDefault();
            var controlId = event.originalEvent.dataTransfer.getData("Text");
            var control = App.Instance.Device.ControlManager.CreateControl(controlId);
            var $control = this.controlFactory.CreateControl(control.Properties);
            page.Childrens.push(control);
            $(page.Properties.$Id).append($control);
        };

        ControlManager.prototype.OnDragOver = function (e) {
            e.preventDefault();
        };

        ControlManager.prototype.FindById = function (id) {
            //this.log.Debug("FindById: " + id);
            return this.FindInContainer(id, this.app);
        };

        ControlManager.prototype.FindInContainer = function (id, control) {
            //this.log.Debug("FindInContainer: " + id, control);
            if (control.Properties.Id === id) {
                return control;
            }
            if (control instanceof DesignerControls.BaseContainer) {
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

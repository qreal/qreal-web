define(["require", "exports", "src/Application", "src/util/log/Log", "src/model/Enums", "src/model/ControlProperty", "src/model/DesignerControls", "src/device/DesignerControlFactory", "src/device/AppControlFactory"], function(require, exports, App, Log, Enums, ControlProperty, DesignerControls, DesignerControlFactory, AppControlFactory) {
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
        };

        /*** Pages ***/
        ControlManager.prototype.CreatePage = function (pageId) {
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
            $page.trigger('pagecreate');
            $('body').append($page);

            this.app.Childrens.push(page);
            this.SelectPage(pageId);

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
                case "Map":
                    var mapProperty = new ControlProperty.MapProperty(this.GetNewId('map'));
                    return new DesignerControls.Map(mapProperty);
                case "Label":
                    var labelProperty = new ControlProperty.LabelProperty(this.GetNewId('label'));
                    return new DesignerControls.Label(labelProperty);
                case "Image":
                    var imageProperty = new ControlProperty.ImageProperty(this.GetNewId('img'));
                    return new DesignerControls.Image(imageProperty);
                case "WebView":
                    var webViewProperty = new ControlProperty.WebViewProperty(this.GetNewId('webview'));
                    return new DesignerControls.WebView(webViewProperty);
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
                case 6 /* Label */:
                    this.ChangeLabelProperty(propertyId, propertyType, newValue);
                    break;
                case 7 /* Image */:
                    this.ChangeImageProperty(propertyId, propertyType, newValue);
                    break;
                case 8 /* WebView */:
                    this.ChangeWebViewProperty(propertyId, propertyType, newValue);
                    break;
            }
        };

        ControlManager.prototype.ChangePageProperty = function (propertyId, propertyType, newValue) {
            this.log.Debug('ChangePageProperty');
            var page = this.FindById(propertyId);
            var $page = $(page.Properties.$Id);
            switch (propertyType) {
                case 7 /* Header */:
                    var cond = newValue == "true";
                    page.Properties.Header = cond;
                    if (cond) {
                        var headerProp = new ControlProperty.HeaderProperty(propertyId + '_header');
                        var header = new DesignerControls.Header(headerProp);
                        var $header = this.controlFactory.CreateHeader(headerProp);

                        page.Header = header;
                        $page.prepend($header);
                    } else {
                        $page.find('div[data-role="header"]').remove();
                        page.Header = null;
                    }
                    break;
                case 5 /* Theme */:
                    $page.removeClass("ui-page-theme-a ui-page-theme-b");
                    page.Properties.Theme = newValue;
                    if (newValue == 'default') {
                        $page.addClass("ui-page-theme-a");
                    } else {
                        $page.addClass("ui-page-theme-" + newValue);
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
                case 5 /* Theme */:
                    //$header.find('h1').text(newValue);
                    header.Properties.Theme = newValue;
                    $header.removeClass("ui-bar-a ui-bar-b ui-bar-inherit").addClass("ui-bar-" + newValue);
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
                    $(button.Properties.$Id).text(newValue);
                    button.Properties.Text = newValue;
                    break;
                case 2 /* Inline */:
                    var cond = newValue == "true";
                    this.ToogleClass(button.Properties.$Id, 'ui-btn-inline', cond);
                    button.Properties.Inline = cond;
                    break;
                case 3 /* Corners */:
                    var cond = newValue == "true";
                    this.ToogleClass(button.Properties.$Id, 'ui-corner-all', cond);
                    button.Properties.Corners = cond;
                    break;
                case 4 /* Mini */:
                    var cond = newValue == "true";
                    this.ToogleClass(button.Properties.$Id, 'ui-mini', cond);
                    button.Properties.Mini = cond;
                    break;
                case 5 /* Theme */:
                    $(button.Properties.$Id).removeClass("ui-btn-a ui-btn-b");
                    $(button.Properties.$Id).addClass('ui-btn-' + newValue);
                    button.Properties.Theme = newValue;
                    break;
            }
        };

        ControlManager.prototype.ChangeInputProperty = function (propertyId, propertyType, newValue) {
            var input = this.FindById(propertyId);
            switch (propertyType) {
                case 0 /* Id */:
                    $(input.Properties.$Id).find('input').attr('id', newValue);
                    $(input.Properties.$Id).find('label').attr('for', newValue);
                    input.Properties.Id = newValue;
                    break;
                case 6 /* Title */:
                    $(input.Properties.$Id).parent().parent().find('label').text(newValue);
                    input.Properties.Title = newValue;
                    break;
                case 4 /* Mini */:
                    var cond = newValue == "true";
                    this.ToogleClass(input.Properties.$Id, 'ui-mini', cond);
                    input.Properties.Mini = cond;
                    break;
                case 5 /* Theme */:
                    break;
            }
        };

        ControlManager.prototype.ChangeLabelProperty = function (propertyId, propertyType, newValue) {
            var label = this.FindById(propertyId);
            switch (propertyType) {
                case 0 /* Id */:
                    $(label.Properties.$Id).attr('id', newValue);
                    label.Properties.Id = newValue;
                    break;
                case 1 /* Text */:
                    $(label.Properties.$Id).text(newValue);
                    label.Properties.Text = newValue;
                    break;
                case 14 /* TextSize */:
                    $(label.Properties.$Id).css('font-size', newValue);
                    label.Properties.TextSize = newValue;
                    break;
            }
        };

        ControlManager.prototype.ChangeImageProperty = function (propertyId, propertyType, newValue) {
            this.log.Debug('ChangeImageProperty');
            var image = this.FindById(propertyId);
            switch (propertyType) {
                case 0 /* Id */:
                    $(image.Properties.$Id).attr('id', newValue);
                    image.Properties.Id = newValue;
                    break;
                case 13 /* Url */:
                    $(image.Properties.$Id).attr('src', newValue);
                    image.Properties.Url = newValue;
                    break;
                case 11 /* Width */:
                    $(image.Properties.$Id).css('width', newValue);
                    image.Properties.Width = newValue;
                    break;
                case 12 /* Height */:
                    $(image.Properties.$Id).css('height', newValue);
                    image.Properties.Height = newValue;
                    break;
            }
        };

        ControlManager.prototype.ChangeMapProperty = function (propertyId, propertyType, newValue) {
            this.log.Debug('ChangeMapProperty');
            var map = this.FindById(propertyId);
            switch (propertyType) {
                case 0 /* Id */:
                    $(map.Properties.$Id).attr('id', newValue);
                    map.Properties.Id = newValue;
                    break;
                case 11 /* Width */:
                    $(map.Properties.$Id).css('width', newValue);
                    map.Properties.Width = newValue;
                    break;
                case 12 /* Height */:
                    $(map.Properties.$Id).css('height', newValue);
                    map.Properties.Height = newValue;
                    break;
            }
        };

        ControlManager.prototype.ChangeWebViewProperty = function (propertyId, propertyType, newValue) {
            this.log.Debug('ChangeMapProperty');
            var webView = this.FindById(propertyId);
            switch (propertyType) {
                case 0 /* Id */:
                    $(webView.Properties.$Id).attr('id', newValue);
                    webView.Properties.Id = newValue;
                    break;
                case 13 /* Url */:
                    $($(webView.Properties.$Id).children('div').get(1)).text('Url: ' + newValue);
                    webView.Properties.Url = newValue;
                    break;
                case 11 /* Width */:
                    $(webView.Properties.$Id).css('width', newValue);
                    webView.Properties.Width = newValue;
                    break;
                case 12 /* Height */:
                    $(webView.Properties.$Id).css('height', newValue);
                    webView.Properties.Height = newValue;
                    break;
            }
        };

        /*** Generation App ***/
        ControlManager.prototype.GenerateAppHtml = function () {
            return this.GenerateHtml(this.app).html();
        };

        ControlManager.prototype.GenerateHtml = function (element) {
            var $html;
            console.log("GenerateHtml:" + element.Properties.Type);
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
                    if (page.Header) {
                        var $header = this.appControlFactory.CreateHeader(page.Header.Properties);
                        $html.prepend($header);
                    }
                    for (var i in page.Childrens) {
                        $html.find('div[role=main]').append(this.GenerateHtml(page.Childrens[i]));
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
                case 5 /* Map */:
                    var map = element;
                    $html = this.appControlFactory.CreateMap(map.Properties);
                    break;
                case 6 /* Label */:
                    var label = element;
                    $html = this.appControlFactory.CreateLabel(label.Properties);
                    break;
                case 7 /* Image */:
                    var image = element;
                    $html = this.appControlFactory.CreateImage(image.Properties);
                    break;
                case 8 /* WebView */:
                    var webView = element;
                    $html = this.appControlFactory.CreateWebView(webView.Properties);
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
                    if (page.Header) {
                        obj['Header'] = page.Header.Properties;
                    }
                    obj["Controls"] = [];
                    page.Childrens.forEach(function (el) {
                        obj["Controls"].push(self.AppToSerializeObj(el));
                    });
                    break;
                case 3 /* Button */:
                case 4 /* Input */:
                case 2 /* Header */:
                case 5 /* Map */:
                    obj = element.Properties;
                    break;
            }
            return obj;
        };

        ControlManager.prototype.Serialize2DiagramEditor = function () {
            var obj = {
                'nodes': [],
                'activities': []
            };
            this.App2Obj4DiagramEditor(obj, this.app);
            return obj;
        };

        ControlManager.prototype.App2Obj4DiagramEditor = function (obj, element) {
            var self = this;
            switch (element.Properties.Type) {
                case 0 /* App */:
                    var app = element;
                    app.Childrens.forEach(function (el) {
                        self.App2Obj4DiagramEditor(obj, el);
                    });
                    break;
                case 1 /* Page */:
                    var page = element;
                    obj['activities'].push({
                        'name': page.Properties.Id
                    });
                    page.Childrens.forEach(function (el) {
                        self.App2Obj4DiagramEditor(obj, el);
                    });
                    break;
                case 3 /* Button */:
                    var button = element;
                    obj["nodes"].push({
                        'id': button.Properties.Id,
                        'type': 'Button',
                        "name": button.Properties.Text,
                        "action": "click"
                    });
                    break;
                case 4 /* Input */:
                    var input = element;
                    obj["nodes"].push({
                        'id': input.Properties.Id,
                        'type': 'Input',
                        "name": 'name',
                        "action": "submit"
                    });
                    break;
                case 2 /* Header */:
                    break;
                case 5 /* Map */:
                    obj["nodes"].push({
                        'id': element.Properties.Id,
                        'type': 'Map'
                    });
                    break;
            }
        };

        ControlManager.prototype.ToogleClass = function (id, cssclass, add) {
            if (add) {
                $(id).addClass(cssclass);
            } else {
                $(id).removeClass(cssclass);
            }
        };

        ControlManager.prototype.OnDrop = function (event, pageId) {
            this.log.Debug("OnDrop, event: ", event);
            event.preventDefault();
            var controlId = event.originalEvent.dataTransfer.getData("Text");
            var control = App.Instance.Device.ControlManager.CreateControl(controlId);
            var $control = this.controlFactory.CreateControl(control.Properties);
            console.log($control);
            var page = this.FindById(pageId);
            page.Childrens.push(control);
            $(page.Properties.$Id).find('div[role=main]').append($control);
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
            if (!control) {
                return null;
            }
            if (control.Properties.Id === id) {
                return control;
            }
            if (control instanceof DesignerControls.Page) {
                var page = control;
                var res = this.FindInContainer(id, page.Header);
                if (res) {
                    return res;
                }
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

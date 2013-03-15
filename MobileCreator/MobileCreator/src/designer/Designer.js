define(["require", "exports", "utils/log/Log", "designer/preferences/ElementPreferences", "designer/preferences/LinearLayoutPreferences", "designer/widgets/LinearLayout", "designer/Form", "designer/widgets/WidgetTypes"], function(require, exports, __mLog__, __mElementPreferences__, __mLinearLayoutPreferences__, __mLinearLayout__, __mForm__, __mWidgetTypes__) {
    var mLog = __mLog__;

    var mElementPreferences = __mElementPreferences__;

    var mLinearLayoutPreferences = __mLinearLayoutPreferences__;

    var mLinearLayout = __mLinearLayout__;

    
    
    
    
    
    
    
    
    var mForm = __mForm__;

    var mWidgetTypes = __mWidgetTypes__;

    var Designer = (function () {
        function Designer() {
            this.logger = new mLog.Logger("Designer");
        }
        Designer.id = 0;
        Designer.instance = new Designer();
        Designer.forms = [];
        Designer.formNames = [];
        Designer.formsDomElement = $("#form");
        Designer.prototype.addForm = function (formName) {
            $("#propertiesEditor").empty();
            Designer.activeForm.hide();
            Designer.activeForm = new mForm.Form(formName, Designer.formsDomElement);
            Designer.forms.push(Designer.activeForm);
            var layoputPreferences = new mLinearLayoutPreferences.LinearLayoutPreferences();
            layoputPreferences.Orientation = mLinearLayoutPreferences.LinearLayoutPreferences.Vertical;
            layoputPreferences.Background = "#ffffff";
            layoputPreferences.Height = mElementPreferences.ElementPreferences.FillParent;
            layoputPreferences.Id = Designer.id;
            Designer.id++;
            layoputPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
            var layout = new mLinearLayout.LinearLayout(layoputPreferences);
            Designer.activeForm.addElement(layout);
            $("#formNameField").val(Designer.activeForm.FormName);
            Designer.formNames.push(formName);
            Designer.activeForm.show();
            this.updateFormsSelect();
        };
        Designer.prototype.sendXml = function () {
            var xml = this.getXML();
            $.ajax("default.htm", {
                type: "POST",
                contentType: "text/XML",
                processData: false,
                data: xml,
                success: function (data) {
                    var servResp = eval(data);
                    if(!servResp.success) {
                        alert("Error sending XML: " + servResp.msg);
                    } else {
                        alert("Success!");
                    }
                }
            });
        };
        Designer.prototype.getXML = function () {
            var xml = "<forms>\n";
            for(var i = 0; i < Designer.forms.length; i++) {
                xml += Designer.forms[i].toXML();
            }
            xml += "</forms>\n";
            return xml;
        };
        Designer.prototype.updateFormsSelect = function () {
            var select = $("#formsSelect");
            select.empty();
            for(var i = 0; i < Designer.forms.length; i++) {
                var currentName = Designer.forms[i].FormName;
                var newOption = $("<option value=\"" + currentName + "\">" + currentName + "</option>");
                if(currentName == Designer.activeForm.FormName) {
                    newOption.attr("selected", "selected");
                }
                select.append(newOption);
            }
            select.selectmenu("refresh", true);
        };
        Designer.prototype.changeActiveForm = function (formName) {
            $("#propertiesEditor").empty();
            Designer.activeForm.hide();
            for(var i = 0; i < Designer.forms.length; i++) {
                if(Designer.forms[i].FormName == formName) {
                    Designer.activeForm = Designer.forms[i];
                    Designer.activeForm.show();
                    break;
                }
            }
            $("#formNameField").val(Designer.activeForm.FormName);
            this.updateFormsSelect();
        };
        Designer.prototype.initDesigner = function () {
            var _this = this;
            this.logger.log("Init designer");
            var parentDiv = $("#menu");
            var designerMenuDiv = document.createElement("ul");
            $(designerMenuDiv).attr("data-role", "listview");
            $(designerMenuDiv).attr("data-inset", "true");
            $(designerMenuDiv).attr("data-divider-theme", "d");
            var propertiesParentDiv = $("#properties");
            var propertiesDiv = document.createElement("ul");
            $(propertiesDiv).attr("data-role", "listview");
            $(propertiesDiv).attr("data-inset", "true");
            $(propertiesDiv).attr("data-divider-theme", "d");
            var sendXMLButton = $("#sendXMLButton");
            $(sendXMLButton).click(function () {
                _this.sendXml();
            });
            var formsTreeHeader = document.createElement("li");
            $(formsTreeHeader).attr("data-role", "list-divider");
            $(formsTreeHeader).text("Forms");
            $(designerMenuDiv).append($(formsTreeHeader));
            var formsSelect = $("<select id=\"formsSelect\"></select>");
            $(designerMenuDiv).append($(formsSelect));
            formsSelect.selectmenu();
            formsSelect.change(function () {
                _this.changeActiveForm(formsSelect.val());
            });
            var addFormButton = $("<a id=\"addFormButton\" data-role=\"button\" draggable=\"false\">New form</a>");
            $(designerMenuDiv).append(addFormButton);
            addFormButton.button();
            $(addFormButton).click(function () {
                _this.addForm("New form");
            });
            var formNameLabel = $("<label for='formNameField' >Form name: </label>");
            var formNameField = $("<input type = 'text' name = 'formNameField' id = 'formNameField' value = '' >");
            $(designerMenuDiv).append(formNameLabel);
            $(designerMenuDiv).append(formNameField);
            $(formNameField).change(function () {
                var newVal = $(formNameField).val();
                var index = Designer.formNames.indexOf(Designer.activeForm.FormName);
                Designer.formNames[index] = newVal;
                Designer.activeForm.FormName = newVal;
                _this.updateFormsSelect();
            });
            formNameField.textinput();
            var elementsPalleteHeader = document.createElement("li");
            $(elementsPalleteHeader).css("margin-top", "20px");
            $(elementsPalleteHeader).attr("data-role", "list-divider");
            $(elementsPalleteHeader).text("Widgets");
            $(designerMenuDiv).append($(elementsPalleteHeader));
            var elementsPalleteContainer = document.createElement("li");
            $(designerMenuDiv).append($(elementsPalleteContainer));
            var elementsPallete = document.createElement("div");
            $(elementsPalleteContainer).append($(elementsPallete));
            var buttonElement = $("<a id=\"button\" data-role=\"button\" draggable=\"true\">Button</a>");
            $(elementsPallete).append(buttonElement);
            buttonElement.button();
            var textViewElement = $("<a id=\"textView\" data-role=\"button\" draggable=\"true\">TextView</a>");
            $(elementsPallete).append(textViewElement);
            textViewElement.button();
            var imageViewElement = $("<a id=\"imageView\" data-role=\"button\" draggable=\"true\">ImageView</a>");
            $(elementsPallete).append(imageViewElement);
            imageViewElement.button();
            var webViewElement = $("<a id=\"webView\" data-role=\"button\" draggable=\"true\">WebView</a>");
            $(elementsPallete).append(webViewElement);
            webViewElement.button();
            var propertiesEditorHeader = document.createElement("li");
            $(propertiesEditorHeader).attr("data-role", "list-divider");
            $(propertiesEditorHeader).text("Properties");
            $(propertiesDiv).append($(propertiesEditorHeader));
            var propertiesEditorContainer = document.createElement("li");
            $(propertiesDiv).append($(propertiesEditorContainer));
            var propertiesEditorDiv = document.createElement("div");
            propertiesEditorDiv.id = "propertiesEditor";
            $(propertiesEditorContainer).append($(propertiesEditorDiv));
            $(parentDiv).prepend($(designerMenuDiv));
            $(propertiesParentDiv).prepend($(propertiesDiv));
            $(designerMenuDiv).listview();
            $(propertiesDiv).listview();
            document.getElementById("button").ondragstart = function (ev) {
                ev.dataTransfer.setData("WidgetType", mWidgetTypes.WidgetTypes.Button.toString());
                ev.dataTransfer.setData("IsNew", "yes");
            };
            document.getElementById("textView").ondragstart = function (ev) {
                ev.dataTransfer.setData("WidgetType", mWidgetTypes.WidgetTypes.TextView.toString());
                ev.dataTransfer.setData("IsNew", "yes");
            };
            document.getElementById("imageView").ondragstart = function (ev) {
                ev.dataTransfer.setData("WidgetType", mWidgetTypes.WidgetTypes.ImageView.toString());
                ev.dataTransfer.setData("IsNew", "yes");
            };
            document.getElementById("webView").ondragstart = function (ev) {
                ev.dataTransfer.setData("WidgetType", mWidgetTypes.WidgetTypes.WebView.toString());
                ev.dataTransfer.setData("IsNew", "yes");
            };
            Designer.activeForm = new mForm.Form("main", Designer.formsDomElement);
            Designer.forms.push(Designer.activeForm);
            Designer.formNames.push("main");
            var layoputPreferences = new mLinearLayoutPreferences.LinearLayoutPreferences();
            layoputPreferences.Orientation = mLinearLayoutPreferences.LinearLayoutPreferences.Vertical;
            layoputPreferences.Background = "#ffffff";
            layoputPreferences.Height = mElementPreferences.ElementPreferences.FillParent;
            layoputPreferences.Id = Designer.id;
            Designer.id++;
            layoputPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
            var layout = new mLinearLayout.LinearLayout(layoputPreferences);
            Designer.activeForm.addElement(layout);
            Designer.activeForm.show();
            this.changeActiveForm("main");
        };
        return Designer;
    })();
    exports.Designer = Designer;    
})

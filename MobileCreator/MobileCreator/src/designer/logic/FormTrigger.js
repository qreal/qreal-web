define(["require", "exports", "designer/logic/Action"], function(require, exports, __mAction__) {
    var mAction = __mAction__;

    var FormTrigger = (function () {
        function FormTrigger(formId, triggerName) {
            this.actions = [];
            this.actions.push(new mAction.Action());
            this.formId = formId;
            this.triggerName = triggerName;
        }
        Object.defineProperty(FormTrigger.prototype, "FormId", {
            get: function () {
                return this.formId;
            },
            set: function (formId) {
                this.formId = formId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormTrigger.prototype, "TriggerName", {
            get: function () {
                return this.triggerName;
            },
            set: function (triggerName) {
                this.triggerName = triggerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FormTrigger.prototype, "Actions", {
            get: function () {
                return this.actions;
            },
            set: function (actions) {
                this.actions = actions;
            },
            enumerable: true,
            configurable: true
        });
        FormTrigger.prototype.addAction = function (action) {
            this.actions.push(action);
        };
        FormTrigger.prototype.show = function (domElement) {
            domElement.empty();
            for(var i = 0; i < this.actions.length; i++) {
                this.actions[i].show();
                if(i != (this.actions.length - 1)) {
                    var removeButton = $("<a href='#' data-role='button' data-inline='true' data-icon='delete' data-iconpos='notext' data-theme='e' data-mini='true'>Delete</a>");
                    domElement.append(removeButton);
                    removeButton.button();
                }
            }
            var newActionDiv = $("<div class='ui-grid-b'></div>");
            var selectActionDiv = $("<div class='ui-block-a'></div>");
            var buttonAddActionDiv = $("<div class='ui-block-b'></div>");
            var selectAction = $("<select name='selectNewAction' id='selectNewAction' data-inline='true' data-mini='true'></select>");
            var loginAction = $("<option value='login'>login</option>");
            var ifAction = $("<option value='if'>if</option>");
            var patientsAction = $("<option value='patients'>patientsRequest</option>");
            var saveSessionAction = $("<option value='saveSession'>saveSession</option>");
            var showMapAction = $("<option value='showMap'>showMap</option>");
            var transitionAction = $("<option value='transition'>transition</option>");
            selectAction.append(loginAction);
            selectAction.append(ifAction);
            selectAction.append(patientsAction);
            selectAction.append(saveSessionAction);
            selectAction.append(showMapAction);
            selectAction.append(transitionAction);
            domElement.append(newActionDiv);
            newActionDiv.append(selectActionDiv);
            selectActionDiv.append(selectAction);
            selectAction.selectmenu();
            var addActionButton = $("<a href='#' data-role='button' data-inline='true' data-icon='plus' data-iconpos='notext' data-theme='e' data-mini='true'>Add action</a>");
            domElement.append(addActionButton);
            newActionDiv.append(buttonAddActionDiv);
            buttonAddActionDiv.append(addActionButton);
            addActionButton.button();
        };
        FormTrigger.prototype.toXML = function () {
            var xml = "<trigger form-id='" + this.formId + "' event='" + this.triggerName + "'>\n";
            var seqCount = 0;
            for(var i = 0; i < this.actions.length - 1; i++) {
                if(this.actions.length == 1) {
                    xml += this.actions[i].toXML();
                    break;
                }
                if(this.actions.length - i - 1 == 1) {
                    xml += "<seq>\n";
                    xml += "<first-operator>\n";
                    xml += this.actions[i].toXML();
                    xml += "</first-operator>\n";
                    xml += "<second-operator>\n";
                    xml += this.actions[i + 1].toXML();
                    xml += "</second-operator>\n";
                    xml += "</seq>\n";
                    break;
                } else {
                    xml += "<seq>\n";
                    xml += "<first-operator>\n";
                    xml += this.actions[i].toXML();
                    xml += "</first-operator>\n";
                    xml += "<second-operator>\n";
                    seqCount++;
                }
            }
            for(var i = 0; i < seqCount; i++) {
                xml += "</second-operator>\n";
                xml += "</seq>\n";
            }
            xml += "</trigger>\n";
            return xml;
        };
        return FormTrigger;
    })();
    exports.FormTrigger = FormTrigger;    
})

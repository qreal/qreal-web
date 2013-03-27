define(["require", "exports", "designer/logic/SaveSessionAction", "designer/logic/TransitionAction", "designer/logic/ShowMapAction", "designer/logic/PatientsRequestAction"], function(require, exports, __mSaveSessionAction__, __mTransitionAction__, __mShowMapAction__, __mPatientsRequestAction__) {
    
    var mSaveSessionAction = __mSaveSessionAction__;

    var mTransitionAction = __mTransitionAction__;

    var mShowMapAction = __mShowMapAction__;

    var mPatientsRequestAction = __mPatientsRequestAction__;

    var FormTrigger = (function () {
        function FormTrigger(formId, triggerName) {
            this.actions = [];
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
        FormTrigger.prototype.setRemoveHandler = function (element, i, domElement) {
            var _this = this;
            element.click(function () {
                _this.actions.splice(i, 1);
                _this.show(domElement);
            });
        };
        FormTrigger.prototype.show = function (domElement) {
            var _this = this;
            domElement.empty();
            for(var i = 0; i < this.actions.length; i++) {
                var containDiv = $("<div data-role='controlgroup' data-type='horizontal' data-mini='true'></div>");
                var action = this.actions[i];
                var actionIndex = i;
                domElement.append(containDiv);
                action.show(containDiv);
                var removeButton = $("<a href='#' data-role='button' data-icon='delete' data-inline='true' data-iconpos='notext' data-theme='e' data-mini='true'>Delete</a>");
                containDiv.append(removeButton);
                removeButton.button();
                domElement.trigger("create");
                this.setRemoveHandler(removeButton, i, domElement);
            }
            var newActionDiv = $("<div class='ui-grid-a'></div>");
            var selectActionDiv = $("<div class='ui-block-a'></div>");
            var buttonAddActionDiv = $("<div class='ui-block-b'></div>");
            var selectAction = $("<select name='selectNewAction' id='selectNewAction' data-mini='true'></select>");
            var loginAction = $("<option value='login'>login</option>");
            var ifAction = $("<option value='if'>if</option>");
            var patientsAction = $("<option value='patients'>getPatients</option>");
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
            var addActionButton = $("<a href='#' data-role='button' data-icon='plus' data-iconpos='notext' data-theme='e' data-mini='true'>Add action</a>");
            domElement.append(addActionButton);
            newActionDiv.append(buttonAddActionDiv);
            buttonAddActionDiv.append(addActionButton);
            addActionButton.button();
            addActionButton.click(function () {
                switch(selectAction.val()) {
                    case "saveSession":
                        _this.addAction(new mSaveSessionAction.SaveSessionAction());
                        _this.show(domElement);
                        break;
                    case "transition":
                        _this.addAction(new mTransitionAction.TransitionAction("main"));
                        _this.show(domElement);
                        break;
                    case "showMap":
                        _this.addAction(new mShowMapAction.ShowMapAction(""));
                        _this.show(domElement);
                        break;
                    case "patients":
                        _this.addAction(new mPatientsRequestAction.PatientsRequestAction("someURL"));
                        _this.show(domElement);
                        break;
                }
            });
        };
        FormTrigger.prototype.toXML = function () {
            var xml = "<trigger form-id='" + this.formId + "' event='" + this.triggerName + "'>\n";
            var seqCount = 0;
            for(var i = 0; i < this.actions.length; i++) {
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
//@ sourceMappingURL=FormTrigger.js.map

define(["require", "exports", "utils/log/Log", "utils/XmlHelper", "emulator/viewmodel/EmulatorViewModel", "emulator/model/managers/NavigationManager", "emulator/model/managers/XmlManager", "emulator/model/managers/EventManager"], function(require, exports, __mLog__, __mXmlHelper__, __mEmulatorViewModel__, __mNavigationManager__, __mXmlManager__, __mEventManager__) {
    var mLog = __mLog__;

    var mXmlHelper = __mXmlHelper__;

    
    
    
    
    
    
    
    
    
    
    
    
    var mEmulatorViewModel = __mEmulatorViewModel__;

    var mNavigationManager = __mNavigationManager__;

    var mXmlManager = __mXmlManager__;

    var mEventManager = __mEventManager__;

    
    
    var Emulator = (function () {
        function Emulator() {
            var _this = this;
            this.logger = new mLog.Logger("Emulator");
            this.logger.log("constructor");
            this.emulatorViewModel = new mEmulatorViewModel.EmulatorViewModel();
            this.navigationManager = new mNavigationManager.NavigationManager();
            this.xmlManager = new mXmlManager.XmlManager();
            this.eventManager = new mEventManager.EventManager();
            $("#back_button").bind('click', function () {
                return _this.navigationManager.back();
            });
        }
        Emulator.instance = new Emulator();
        Emulator.prototype.showXmlStringView = function (xml) {
            var _this = this;
            this.logger.log("showXmlStringView: \n" + xml);
            this.clearUi();
            xml = mXmlHelper.escapeXml(xml);
            var application = this.xmlManager.parseStoredXml('/res/application.xml');
            var pages = application.pages;
            var triggers = application.triggers;
            var _eventManager = this.eventManager;
            triggers.forEach(function (trigger) {
                return _this.eventManager.addTrigger(trigger);
            });
            pages.map(function (page) {
                return _this.addPage(page);
            });
            this.navigationManager.showPage(pages[0].Name);
        };
        Emulator.prototype.addPage = function (page) {
            this.navigationManager.addPage(page);
            this.emulatorViewModel.addView(page.Root);
        };
        Emulator.prototype.showPage = function (page) {
            this.emulatorViewModel.showView(page);
        };
        Object.defineProperty(Emulator.prototype, "NavigationManager", {
            get: function () {
                return this.navigationManager;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emulator.prototype, "EmulatorViewModel", {
            get: function () {
                return this.emulatorViewModel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emulator.prototype, "EventManager", {
            get: function () {
                return this.eventManager;
            },
            enumerable: true,
            configurable: true
        });
        Emulator.prototype.trigger = function (eventType, eventData) {
            this.logger.log("trigger " + eventType + " eventData " + eventData);
        };
        Emulator.prototype.clearUi = function () {
            this.navigationManager.clear();
            this.emulatorViewModel.clear();
            this.eventManager.clear();
        };
        return Emulator;
    })();
    exports.Emulator = Emulator;    
})
//@ sourceMappingURL=Emulator.js.map

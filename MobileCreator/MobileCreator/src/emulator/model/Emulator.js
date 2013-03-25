define(["require", "exports", "utils/log/Log", "utils/XmlHelper", "emulator/viewmodel/EmulatorViewModel", "emulator/model/managers/NavigationManager", "emulator/model/managers/XmlManager", "emulator/model/logic/Trigger"], function(require, exports, __mLog__, __mXmlHelper__, __mEmulatorViewModel__, __mNavigationManager__, __mXmlManager__, __mTrigger__) {
    var mLog = __mLog__;

    var mXmlHelper = __mXmlHelper__;

    
    
    
    
    
    
    
    
    
    
    
    
    var mEmulatorViewModel = __mEmulatorViewModel__;

    var mNavigationManager = __mNavigationManager__;

    var mXmlManager = __mXmlManager__;

    var mTrigger = __mTrigger__;

    
    var Emulator = (function () {
        function Emulator() {
            var _this = this;
            this.logger = new mLog.Logger("Emulator");
            this.logger.log("constructor");
            this.emulatorViewModel = new mEmulatorViewModel.EmulatorViewModel();
            this.navigationManager = new mNavigationManager.NavigationManager();
            this.xmlManager = new mXmlManager.XmlManager();
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
            var pages = this.xmlManager.parseXmlString(xml);
            pages.map(function (page) {
                return _this.addPage(page);
            });
            pages.map(function (page) {
                var onShowTrigger = new mTrigger.Trigger(mTrigger.Trigger.OnShow, function () {
                    console.log("OnShow Trigger");
                });
                page.addTrigger(onShowTrigger);
                var onTimerTrigger = new mTrigger.Trigger(mTrigger.Trigger.OnTimer, function () {
                    console.log("onTimer Trigger");
                });
                page.addTrigger(onTimerTrigger);
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
        Emulator.prototype.clearUi = function () {
            this.navigationManager.clear();
            this.emulatorViewModel.clear();
        };
        return Emulator;
    })();
    exports.Emulator = Emulator;    
})

var mLog = require("./utils/log/Log")
var mXmlHelper = require("./utils/XmlHelper")












var mEmulatorViewModel = require("./emulator/viewmodel/EmulatorViewModel")
var mNavigationManager = require("./emulator/model/managers/NavigationManager")
var mXmlManager = require("./emulator/model/managers/XmlManager")
var mEventManager = require("./emulator/model/managers/EventManager")


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
        var application = this.xmlManager.parseXmlString(xml);
        var pages = application.pages;
        var triggers = application.triggers;
        var _eventManager = this.eventManager;
        triggers.map(function (trigger) {
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
    Emulator.prototype.clearUi = function () {
        this.navigationManager.clear();
        this.emulatorViewModel.clear();
        this.eventManager.clear();
    };
    return Emulator;
})();
exports.Emulator = Emulator;
//@ sourceMappingURL=Emulator.js.map

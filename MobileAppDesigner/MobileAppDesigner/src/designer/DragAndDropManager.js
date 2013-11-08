define(["require", "exports", "src/util/log/Log"], function(require, exports, __Log__) {
    var Log = __Log__;

    var DragAndDropManager = (function () {
        function DragAndDropManager() {
            this.log = new Log("DragAndDropManager");
            this.log.Debug("Init");
        }
        return DragAndDropManager;
    })();

    
    return DragAndDropManager;
});
//# sourceMappingURL=DragAndDropManager.js.map

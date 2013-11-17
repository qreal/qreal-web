define(["require", "exports", "src/util/log/Log"], function(require, exports, __Log__) {
    var Log = __Log__;

    var TestClass = (function () {
        // Constructor
        function TestClass(x, y) {
            this.x = x;
            this.y = y;
        }
        TestClass.GetInstance = function () {
            return new TestClass(0, 0);
        };

        TestClass.prototype.Init = function () {
            Log.GetInstance("TestClass").Debug("test");
        };
        return TestClass;
    })();

    
    return TestClass;
});
//# sourceMappingURL=TestClass.js.map

define(["require", "exports"], function(require, exports) {
    var TestClass = (function () {
        // Constructor
        function TestClass(x, y) {
            this.x = x;
            this.y = y;
        }
        TestClass.GetInstance = function () {
            return new TestClass(0, 0);
        };
        return TestClass;
    })();

    
    return TestClass;
});
//# sourceMappingURL=TestClass.js.map

define(["require", "exports"], function(require, exports) {
    var TestClass = (function () {
        function TestClass() {
            console.log("ggg");
        }
        TestClass.prototype.ggg = function () {
            console.log("ggg");
        };
        return TestClass;
    })();

    
    return TestClass;
});
//# sourceMappingURL=TestClass.js.map

var XmlHttpFactory = (function () {
    function XmlHttpFactory() {
    }
    XmlHttpFactory.createXMLHTTPObject = function () {
        var xmlHttp = undefined;
        for (var i = 0; i < this.XMLHttpFactories.length; i++) {
            try {
                xmlHttp = this.XMLHttpFactories[i]();
            }
            catch (e) {
                continue;
            }
            break;
        }
        return xmlHttp;
    };
    XmlHttpFactory.XMLHttpFactories = [
        function () {
            return new XMLHttpRequest();
        },
        function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        },
        function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        },
        function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
    ];
    return XmlHttpFactory;
})();
//# sourceMappingURL=XmlHttpFactory.js.map
define(["require", "exports"], function(require, exports) {
    function escapeXml(xml) {
        return xml.replace(/&amp;/g, "&").replace(/&/g, "&amp;");
    }
    exports.escapeXml = escapeXml;
})

/**
 * Created by vladzx on 10.10.14.
 */
var DefaultDiagramNode = (function () {
    function DefaultDiagramNode(type, x, y, properties, imagePath, id) {
        this.type = type;
        var jointObjectAttributes = {
            position: { x: x, y: y },
            size: { width: 50, height: 50 },
            outPorts: [''],
            attrs: {
                image: {
                    'xlink:href': imagePath
                }
            }
        };
        if (id) {
            jQuery.extend(jointObjectAttributes, { id: id });
        }
        this.jointObject = new joint.shapes.devs.ImageWithPorts(jointObjectAttributes);
        this.properties = properties;
        this.imagePath = imagePath;
    }
    DefaultDiagramNode.prototype.getType = function () {
        return this.type;
    };
    DefaultDiagramNode.prototype.getX = function () {
        return (this.jointObject.get("position"))['x'];
    };
    DefaultDiagramNode.prototype.getY = function () {
        return (this.jointObject.get("position"))['y'];
    };
    DefaultDiagramNode.prototype.getImagePath = function () {
        return this.imagePath;
    };
    DefaultDiagramNode.prototype.getJointObject = function () {
        return this.jointObject;
    };
    DefaultDiagramNode.prototype.setProperty = function (name, property) {
        this.properties[name] = property;
    };
    DefaultDiagramNode.prototype.getProperties = function () {
        return this.properties;
    };
    return DefaultDiagramNode;
})();
//# sourceMappingURL=DefaultDiagramNode.js.map
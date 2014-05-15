var services = angular.module('services', []);
var Controllers;
(function (Controllers) {
    var diagramCtrl = (function () {
        function diagramCtrl($scope, validateService) {
            this.graph = new joint.dia.Graph();
            this.paper = new joint.dia.Paper({
                el: $('#paper'),
                width: 600,
                height: 400,
                gridSize: 1,
                model: this.graph
            });
            this.nodesList = [];
            this.activities = [];
            $scope.vm = this;
            this.validateService = validateService;

            this.paper.on('cell:pointerdblclick', function (cellView, evt, x, y) {
                $('#my-select').remove();
                $('#properties').attr("class", "col-md-6");
                $scope.vm.nodesList.forEach(function (shape) {
                    if (shape.el.id == cellView.model.id) {
                        $scope.vm.currentNode = shape;
                        $('#text').val($scope.vm.currentNode.text);
                        $('#id').val($scope.vm.currentNode.id);
                        if (shape.type == ServiceType[ServiceType.NavigationService]) {
                            $('#action').append($("<select>").attr("class", "form-control").attr("id", "my-select"));
                            $scope.vm.activities.forEach(function (activity) {
                                if (activity == shape.activity) {
                                    $('#my-select').append($("<option>").attr('value', activity).text(activity).attr('selected', 'selected'));
                                } else {
                                    $('#my-select').append($("<option>").attr('value', activity).text(activity));
                                }
                            });
                        }
                        if (shape.type == ServiceType[ServiceType.GeolocationService]) {
                            console.log("GEOLOC");
                        }
                        if (shape.type == NodeType[NodeType.Button]) {
                            $('#action').append($("<select>").attr("class", "form-control").attr("id", "my-select"));
                            for (var i in ButtonAction) {
                                if (parseInt(i, 10) >= 0) {
                                    if (ButtonAction[i] == shape.action) {
                                        $('#my-select').append($("<option>").attr('value', i).text(ButtonAction[i]).attr('selected', 'selected'));
                                    } else {
                                        $('#my-select').append($("<option>").attr('value', i).text(ButtonAction[i]));
                                    }
                                }
                            }
                            $('#action').append($("<label>").text("Action"));
                        }
                        if (shape.type == NodeType[NodeType.Input]) {
                            $('#action').append($("<select>").attr("class", "form-control").attr("id", "action-select"));
                            for (var i in InputAction) {
                                if (parseInt(i, 10) >= 0) {
                                    if (i == shape.action) {
                                        $('#action-select').append($("<option>").attr('value', i).text(InputAction[i]).attr('selected', 'selected'));
                                    } else {
                                        $('#action-select').append($("<option>").attr('value', i).text(InputAction[i]));
                                    }
                                }
                            }
                        }
                    }
                });
            });

            this.graph.on('add', function (link) {
                link.on('change:source', function () {
                    $scope.vm.validate();
                });
                link.on('change:target', function () {
                    $scope.vm.validate();
                });
            });

            $('html').keyup(function (e) {
                if (e.keyCode == 46) {
                    if ($scope.vm.currentNode == null) {
                        alert("Current Shape is not defined");
                    } else {
                        $scope.vm.currentNode.el.remove();
                        $scope.vm.shapeList.splice($scope.vm.currentNode, $scope.vm.shapeList.indexOf($scope.vm.currentNode));
                    }
                }
            });
        }
        diagramCtrl.prototype.createInput = function () {
            this.nodesList.push(ShapesFactory.createInput(this.graph, null, "Unknown"));
        };

        diagramCtrl.prototype.createButton = function () {
            this.nodesList.push(ShapesFactory.createButton(this.graph, null, "Unknown"));
        };

        diagramCtrl.prototype.createInitialNode = function () {
            this.nodesList.push(ShapesFactory.createInitialNode(this.graph));
        };

        diagramCtrl.prototype.createLabel = function () {
            this.nodesList.push(ShapesFactory.createLabel(this.graph, null));
        };

        diagramCtrl.prototype.createNavigationService = function () {
            this.nodesList.push(ShapesFactory.createNavigationService(this.graph, null));
        };

        diagramCtrl.prototype.createGeolocationService = function () {
            this.nodesList.push(ShapesFactory.createGeolocationService(this.graph, null));
        };

        diagramCtrl.prototype.validate = function () {
            var res = this.validateService.validate(this.nodesList, this.graph);
            if (res.indexOf("passed") == -1 && res.indexOf("undefined") == -1) {
                alert(res);
            }
        };

        diagramCtrl.prototype.clear = function () {
            this.graph.clear();
        };

        diagramCtrl.prototype.updateValues = function () {
            this.currentNode.setText($('#text').val());
            this.currentNode.id = $('#id').val();
            if (this.currentNode.type == NodeType[NodeType.Button]) {
                var button = this.anyTypeConvecter(this.currentNode);
                button.action = $('#my-select :selected').text();
            }
            if (this.currentNode.type == ServiceType[ServiceType.NavigationService]) {
                var navService = this.anyTypeConvecter(this.currentNode);
                navService.activity = $('#my-select :selected').text();
            }

            $('#alertblock').append($('<div>').attr('id', 'alert').attr('class', 'bg-success').text('Successfully updated'));
            $('#alert').append('<button type="button" class="close" data-dismiss="alert">&times;</button>');
        };

        diagramCtrl.prototype.close = function () {
            $('#properties').attr("class", "col-md-6 hidden");
        };

        diagramCtrl.prototype.uploadFromFile = function () {
            var th = this;
            $.getJSON("graph.json").done(function (json) {
                th.generateGraph(json, th.graph);
            }).fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                alert("Request Failed: " + err);
            });
        };

        diagramCtrl.prototype.generateGraph = function (json, graph) {
            var graph = this.graph;
            this.json = json;
            graph.clear();
            this.nodesList = [];
            var th = this;
            var cnt = 0;
            var dy = 0;
            var dx = 0;
            var prev = 0;
            this.activities.push("Unknown");
            json.nodes.forEach(function (node) {
                switch (node.type) {
                    case "Button":
                        var button = ShapesFactory.createButton(graph, node.id, node.action);
                        button.el.translate(90 * dx, 100 * dy);
                        th.nodesList.push(button);
                        break;
                    case "Input":
                        var input = ShapesFactory.createInput(graph, node.id, node.action);
                        input.el.translate(90 * dx, 100 * dy);
                        th.nodesList.push(input);
                        break;
                    case "Label":
                        var label = ShapesFactory.createLabel(graph, node.id);
                        label.el.translate(90 * dx, 100 * dy);
                        th.nodesList.push(label);
                        break;
                    default:
                        alert('Unknown type');
                }
                cnt++;
                dx++;
                prev = dy;
                dy = (cnt - cnt % 6) / 6;
                if (dy != prev) {
                    dx = 0;
                }
            });

            json.activities.forEach(function (activity) {
                th.activities.push(activity.name);
            });
        };

        diagramCtrl.prototype.anyTypeConvecter = function (object) {
            return object;
        };

        diagramCtrl.prototype.export = function () {
            var cnt = 0;
            var th = this;
            th.json.services = [];
            this.nodesList.forEach(function (shape) {
                if (shape.type == ServiceType[ServiceType.NavigationService]) {
                    var navService = th.anyTypeConvecter(shape);
                    var service = {
                        id: navService.id,
                        type: navService.type,
                        activity: navService.activity
                    };
                    th.json.services[cnt] = service;
                    cnt++;
                }
            });

            cnt = 0;
            th.json.links = [];
            this.graph.getLinks().forEach(function (link) {
                var src = th.getNodeById(link.get('source').id);
                var trgt = th.getNodeById(link.get('target').id);
                var newLink = {
                    source: src.id,
                    target: trgt.id
                };
                th.json.links[cnt] = newLink;
            });

            alert(JSON.stringify(this.json));
        };

        diagramCtrl.prototype.getNodeById = function (id) {
            var el;
            this.nodesList.forEach(function (node) {
                if (node.getElement().id == id) {
                    console.log("NASHLI!!!");
                    el = node;
                    return;
                }
            });
            return el;
        };
        return diagramCtrl;
    })();
    Controllers.diagramCtrl = diagramCtrl;
})(Controllers || (Controllers = {}));
angular.module('diagram', ['controllers', 'services', 'directives']);
var directives = angular.module('directives', []);
var ActionNode = (function () {
    function ActionNode(el) {
        this.el = el;
        this.type = NodeType.Action;
    }
    ActionNode.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .2, 'ref-y': .9 / 2 }
        });
    };
    ActionNode.prototype.getElement = function () {
        return this.el;
    };
    return ActionNode;
})();
var ButtonAction;
(function (ButtonAction) {
    ButtonAction[ButtonAction["Unknown"] = 0] = "Unknown";
    ButtonAction[ButtonAction["Click"] = 1] = "Click";
    ButtonAction[ButtonAction["DoubleClick"] = 2] = "DoubleClick";
})(ButtonAction || (ButtonAction = {}));

var InputAction;
(function (InputAction) {
    InputAction[InputAction["Unknown"] = 0] = "Unknown";
    InputAction[InputAction["Submit"] = 1] = "Submit";
})(InputAction || (InputAction = {}));
var Button = (function () {
    function Button(el, id, action) {
        this.el = el;
        this.type = NodeType[NodeType.Button];
        this.id = id;
        this.action = action;
    }
    Button.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .2, 'ref-y': .9 / 2 }
        });
    };
    Button.prototype.getElement = function () {
        return this.el;
    };
    return Button;
})();
var ConditionNode = (function () {
    function ConditionNode(el) {
        this.el = el;
        this.type = NodeType.Condition;
    }
    ConditionNode.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .3, 'ref-y': .4 }
        });
    };
    ConditionNode.prototype.getElement = function () {
        return this.el;
    };
    return ConditionNode;
})();
var FinalNode = (function () {
    function FinalNode(el) {
        this.el = el;
        this.type = NodeType.Final;
    }
    FinalNode.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .7 / 2, 'ref-y': .4 }
        });
    };
    FinalNode.prototype.getElement = function () {
        return this.el;
    };
    return FinalNode;
})();
var GeolocationService = (function () {
    function GeolocationService(el, id) {
        this.el = new joint.shapes.devs.RectWithPorts();
        this.el = el;
        this.type = ServiceType[ServiceType.GeolocationService];
        this.id = id;
    }
    GeolocationService.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .2, 'ref-y': .9 / 2 }
        });
    };

    GeolocationService.prototype.getElement = function () {
        return this.el;
    };
    return GeolocationService;
})();
var InitialNode = (function () {
    function InitialNode(el) {
        this.el = el;
        this.type = NodeType.Initial;
    }
    InitialNode.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .7 / 2, 'ref-y': .4 }
        });
    };
    InitialNode.prototype.getElement = function () {
        return this.el;
    };
    return InitialNode;
})();
var Input = (function () {
    function Input(el, id, action) {
        this.el = el;
        this.type = NodeType[NodeType.Input];
        this.id = id;
        this.action = InputAction[action];
    }
    Input.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .7 / 2, 'ref-y': .4 }
        });
    };

    Input.prototype.getElement = function () {
        return this.el;
    };
    return Input;
})();
var Label = (function () {
    function Label(el, id) {
        this.el = el;
        this.type = NodeType.Label;
        this.id = id;
    }
    Label.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .3, 'ref-y': .4 }
        });
    };
    Label.prototype.getElement = function () {
        return this.el;
    };
    return Label;
})();
var NavigationService = (function () {
    function NavigationService(el, id) {
        this.el = new joint.shapes.devs.RectWithPorts();
        this.el = el;
        this.type = ServiceType[ServiceType.NavigationService];
        this.id = id;
    }
    NavigationService.prototype.setText = function (text) {
        this.text = text;
        this.el.attr({
            '.label': { text: text, 'ref-x': .2, 'ref-y': .9 / 2 }
        });
    };

    NavigationService.prototype.getElement = function () {
        return this.el;
    };
    return NavigationService;
})();
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Button"] = 0] = "Button";
    NodeType[NodeType["Label"] = 1] = "Label";
    NodeType[NodeType["Input"] = 2] = "Input";
    NodeType[NodeType["Initial"] = 3] = "Initial";
})(NodeType || (NodeType = {}));
var ServiceType;
(function (ServiceType) {
    ServiceType[ServiceType["NavigationService"] = 0] = "NavigationService";
    ServiceType[ServiceType["GeolocationService"] = 1] = "GeolocationService";
})(ServiceType || (ServiceType = {}));
var ShapesFactory = (function () {
    function ShapesFactory() {
    }
    ShapesFactory.createInput = function (graph, id, action) {
        var el = new joint.shapes.devs.EllipseWithPorts({
            position: { x: 20, y: 20 },
            inPorts: [''],
            outPorts: [],
            attrs: {
                '.outer': {
                    stroke: '#000000',
                    'stroke-width': 1,
                    'stroke-style': 'solid',
                    rx: 500,
                    ry: 250,
                    fill: '#ffffff'
                },
                '.label': {
                    'ref-x': .4,
                    'ref-y': .4
                }
            }
        });
        graph.addCell(el);

        if (id == null) {
            id = el.id;
        }
        var node = new Input(el, id, action);
        node.setText("Input");
        return node;
    };

    ShapesFactory.createInitialNode = function (graph) {
        var el = new joint.shapes.devs.EllipseWithPorts({
            position: { x: 20, y: 20 },
            outPorts: ['', '', ''],
            attrs: {
                '.outer': {
                    stroke: '#000000',
                    'stroke-width': 1,
                    'stroke-style': 'solid',
                    rx: 500,
                    ry: 250,
                    fill: '#f8f8f8'
                },
                '.label': {
                    'ref-x': .7 / 2,
                    'ref-y': .4
                }
            }
        });
        graph.addCell(el);
        var node = new InitialNode(el);
        node.setText("Initial");
        return node;
    };

    ShapesFactory.createButton = function (graph, id, action) {
        var el = new joint.shapes.devs.RectWithPorts({
            position: { x: 20, y: 20 },
            outPorts: ['']
        });
        graph.addCell(el);
        if (id == null) {
            id = el.id;
        }
        var node = new Button(el, id, action);
        node.setText("Button");
        return node;
    };

    ShapesFactory.createLabel = function (graph, id) {
        var el = new joint.shapes.devs.Diamond({
            position: { x: 20, y: 20 },
            inPorts: [''],
            attrs: {
                '.outer': {
                    stroke: '#000000',
                    'stroke-width': 1,
                    'stroke-style': 'solid',
                    fill: '#f8f8f8'
                }
            }
        });

        if (id == null) {
            id = el.id;
        }
        el.rotate(45, 0);
        graph.addCell(el);
        var node = new Label(el, id);
        node.setText("Label");
        return node;
    };

    ShapesFactory.createNavigationService = function (graph, id) {
        var el = new joint.shapes.devs.RectWithPorts({
            position: { x: 20, y: 20 },
            inPorts: [''],
            size: { width: 120, height: 120 }
        });
        el.attr({
            '.label': { 'ref-x': .0, 'ref-y': .0 },
            '.outer': { fill: '#42aaff' }
        });
        graph.addCell(el);
        if (id == null) {
            id = el.id;
        }

        var service = new NavigationService(el, id);
        service.setText("Navigation Service");
        return service;
    };

    ShapesFactory.createGeolocationService = function (graph, id) {
        var el = new joint.shapes.devs.RectWithPorts({
            position: { x: 20, y: 20 },
            inPorts: [''],
            size: { width: 120, height: 120 }
        });
        el.attr({
            '.label': { 'ref-x': .0, 'ref-y': .0 },
            '.outer': { fill: '#fadadd' }
        });
        graph.addCell(el);
        if (id == null) {
            id = el.id;
        }

        var service = new GeolocationService(el, id);
        service.setText("Geolocation Service");
        return service;
    };
    return ShapesFactory;
})();
var Edge = (function () {
    function Edge(source, target) {
        this.source = source;
        this.target = target;
    }
    return Edge;
})();
var ValidateService = (function () {
    function ValidateService() {
        this.possibleEdges = [];

        this.possibleEdges.push(new Edge(NodeType.Label, NodeType.Label));
        this.possibleEdges.push(new Edge(NodeType.Label, NodeType.Button));
        this.possibleEdges.push(new Edge(NodeType.Label, NodeType.Input));

        this.possibleEdges.push(new Edge(NodeType.Initial, NodeType.Label));
        this.possibleEdges.push(new Edge(NodeType.Initial, NodeType.Input));
        this.possibleEdges.push(new Edge(NodeType.Initial, NodeType.Button));

        this.possibleEdges.push(new Edge(NodeType.Button, NodeType.Label));
        this.possibleEdges.push(new Edge(NodeType.Button, NodeType.Input));
        this.possibleEdges.push(new Edge(NodeType.Button, NodeType.Initial));
        this.possibleEdges.push(new Edge(NodeType.Button, NodeType.Button));
    }
    ValidateService.prototype.validate = function (shapes, graph) {
        var links = graph.getLinks();
        var res;
        var find;
        var th = this;
        res = "Validation passed!";
        links.forEach(function (link) {
            find = false;
            var source = link.get('source');
            var target = link.get('target');
            var sourceType = th.getElementType(shapes, source);
            var targetType = th.getElementType(shapes, target);
            th.possibleEdges.forEach(function (edge) {
                if (edge.source == sourceType && edge.target == targetType) {
                    find = true;
                }
            });
            if (!find) {
                res = "Cant accept edge from " + NodeType[sourceType] + " to " + NodeType[targetType];
            }
        });

        return res;
    };

    ValidateService.prototype.getElementType = function (shapes, el) {
        var type;
        shapes.forEach(function (shape) {
            if (shape.getElement().id == el.id) {
                type = shape.type;
            }
        });
        return type;
    };
    return ValidateService;
})();
services.service('validateService', ValidateService);
angular.module('controllers', []).controller(Controllers);
//# sourceMappingURL=out.js.map

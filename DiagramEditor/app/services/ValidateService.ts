class ValidateService {

    possibleEdges:Edge[];

    constructor() {
        this.possibleEdges = [];

        this.possibleEdges.push(new Edge(NodeType.Condition, NodeType.Condition));
        this.possibleEdges.push(new Edge(NodeType.Condition, NodeType.Action));
        this.possibleEdges.push(new Edge(NodeType.Condition, NodeType.Final));

        this.possibleEdges.push(new Edge(NodeType.Initial, NodeType.Condition));
        this.possibleEdges.push(new Edge(NodeType.Initial, NodeType.Final));
        this.possibleEdges.push(new Edge(NodeType.Initial, NodeType.Action));

        this.possibleEdges.push(new Edge(NodeType.Action, NodeType.Condition));
        this.possibleEdges.push(new Edge(NodeType.Action, NodeType.Final));
        this.possibleEdges.push(new Edge(NodeType.Action, NodeType.Initial));
        this.possibleEdges.push(new Edge(NodeType.Action, NodeType.Action));
    }

    validate(shapes:Shape[], graph:joint.dia.Graph) {
        var links:joint.dia.Link[] = graph.getLinks();
        var res : string;
        var find:boolean;
        var th = this;
        res = "Validation passed";
        links.forEach(function (link) {
            find = false;
            var source:joint.shapes.devs.Generic = link.get('source');
            var target:joint.shapes.devs.Generic = link.get('target');
            var sourceType : NodeType = th.getElementType(shapes, source);
            var targetType : NodeType = th.getElementType(shapes, target);
            th.possibleEdges.forEach(function(edge) {
                if (edge.source == sourceType && edge.target == targetType ) {
                    find = true;
                }
            });
            if (!find) {
                res = "Cant accept edge from " + NodeType[sourceType] + " to " + NodeType[targetType];
            }
        });
        return res;
    }

    getElementType(shapes:Shape[], el:joint.shapes.devs.Generic) {
        var type : NodeType;
        shapes.forEach(function (shape) {
            if (shape.getElement().id == el.id) {
                type = shape.type;
            }
        });
        return type;
    }
}
services.service('validateService', ValidateService);
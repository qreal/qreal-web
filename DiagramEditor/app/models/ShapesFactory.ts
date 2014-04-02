class ShapesFactory {

    static createFinalNode(graph:joint.dia.Graph) {
        var el = new joint.shapes.devs.EllipseWithPorts({
            position: { x: 20, y: 20 },
            inPorts: [''],
            outPorts: [],
            attrs: {
                '.outer': {
                    stroke: '#000000', 'stroke-width': 1,
                    'stroke-style': 'solid',
                    rx: 500, ry: 250,
                    fill: '#ffffff'
                },
                '.label': {
                    'ref-x': .4,
                    'ref-y': .4
                }
            }
        });
        graph.addCell(el);
        var node = new FinalNode(el);
        node.setText("final");
        return node;
    }

    static createInitialNode(graph:joint.dia.Graph) {
        var el = new joint.shapes.devs.EllipseWithPorts({
            position: { x: 20, y: 20 },
            outPorts: ['', '', ''],
            attrs: {
                '.outer': {
                    stroke: '#000000', 'stroke-width': 1,
                    'stroke-style': 'solid',
                    rx: 500, ry: 250,
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
    }

    static createActionNode(graph:joint.dia.Graph) {
        var el = new joint.shapes.devs.RectWithPorts({
            position: { x: 20, y: 20 },
            inPorts: ['', ''],
            outPorts: ['', '']
        });
        graph.addCell(el);
        var node = new ActionNode(el);
        node.setText("process");
        return node;
    }

    static createConditionNode(graph:joint.dia.Graph) {
        var el = new joint.shapes.devs.Diamond({
            position: { x: 20, y: 20 },
            inPorts: ['', ''],
            outPorts: ['', ''],
            attrs: {
                '.outer': {
                    stroke: '#000000', 'stroke-width': 1,
                    'stroke-style': 'solid',
                    fill: '#f8f8f8'
                }
            }
        });


        el.rotate(45, 0);
        graph.addCell(el);
        var node = new ConditionNode(el);
        node.setText("123");
        return node;
    }
}
class ShapesFactory {

    static createFinalNode(graph:joint.dia.Graph) {
        var el = new joint.shapes.devs.EllipseWithPorts({
            position: { x: 20, y: 20 },
            inPorts: [''],
            outPorts: ['', '']
        });
        graph.addCell(el);
       return new FinalNode(el);
    }

    static createInitialNode(graph:joint.dia.Graph) {
        var el = new joint.shapes.devs.EllipseWithPorts({
            position: { x: 20, y: 20 },
            inPorts: [''],
            outPorts: ['', '']
        });
        graph.addCell(el);
        return new InitialNode(el);
    }

    static createActionNode(graph:joint.dia.Graph) {
        var el = new joint.shapes.devs.RectWithPorts({
            position: { x: 20, y: 20 },
            inPorts: [''],
            outPorts: ['', '']
        });
        graph.addCell(el);
        return new ActionNode(el);
    }

    static createConditionNode(graph:joint.dia.Graph) {
        var el = new joint.shapes.devs.RectWithPorts({
            position: { x: 20, y: 20 },
            inPorts: [''],
            outPorts: ['', '']
        });
        graph.addCell(el);
        return new ConditionNode(el);
    }







}
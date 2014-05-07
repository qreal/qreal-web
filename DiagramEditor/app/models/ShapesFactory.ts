class ShapesFactory {

    static createInput(graph:joint.dia.Graph, id:string, action:string) {
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

        if (id == null) {
            id = el.id;
        }
        var node = new Input(el, id, action);
        node.setText("Input");
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

    static createButton(graph:joint.dia.Graph, id:string, action:string) {
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
    }

    static createLabel(graph:joint.dia.Graph, id:string) {
        var el = new joint.shapes.devs.Diamond({
            position: { x: 20, y: 20 },
            inPorts: [''],
            attrs: {
                '.outer': {
                    stroke: '#000000', 'stroke-width': 1,
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
    }


    static createNavigationService(graph:joint.dia.Graph, id:string) {
        var el = new joint.shapes.devs.RectWithPorts({
            position: { x: 20, y: 20 },
            inPorts: [''],
            size : {width : 120, height : 120},
        });
        el.attr({
                '.label': {'ref-x': .0, 'ref-y': .0 },
                '.outer' : { fill : '#42aaff' }
            }
        )
        graph.addCell(el);
        if (id == null) {
            id = el.id;
        }

        var service = new NavigationService(el, id);
        service.setText("Navigation Service")
        return service;
    }

    static createGeolocationService(graph:joint.dia.Graph, id:string) {
        var el = new joint.shapes.devs.RectWithPorts({
            position: { x: 20, y: 20 },
            inPorts: [''],
            size : {width : 120, height : 120},
        });
        el.attr({
                '.label': {'ref-x': .0, 'ref-y': .0 },
                '.outer' : { fill : '#fadadd' }
            }
        )
        graph.addCell(el);
        if (id == null) {
            id = el.id;
        }

        var service = new GeolocationService(el, id);
        service.setText("Geolocation Service")
        return service;

    }
}
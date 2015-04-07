class DiagramPaper extends joint.dia.Paper {
    private gridSizeValue: number;

    constructor(graph: joint.dia.Graph) {
        this.gridSizeValue = 25;
        super({
            el: $('#diagram_paper'),
            width: 2000,
            height: 2000,
            model: graph,
            gridSize: this.gridSizeValue,
            defaultLink: new joint.dia.Link({
                attrs: {
                    '.connection': { stroke: 'black' },
                    '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
                }
            }),
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                return (!(magnetT && magnetT.getAttribute('type') === 'output') && !(cellViewT && cellViewT.model.get('type') === 'link'));
            },
            validateMagnet: function (cellView, magnet) {
                return magnet.getAttribute('magnet') !== 'passive';
            }
        });
    }

    getGridSizeValue(): number {
        return this.gridSizeValue;
    }
}
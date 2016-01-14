class DiagramEditor {

    private graph: joint.dia.Graph;
    private paper: DiagramPaper;

    constructor() {
        this.graph = new joint.dia.Graph;
        this.paper = new DiagramPaper(this.graph);
    }

    public getGraph(): joint.dia.Graph {
        return this.graph;
    }

    public getPaper(): DiagramPaper {
        return this.paper;
    }

    public clear(): void {
        this.graph.clear();
        this.paper.clear();
    }

}
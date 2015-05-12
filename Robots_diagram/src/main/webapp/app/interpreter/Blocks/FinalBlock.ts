class FinalBlock extends Block {
    static run(node, graph): string {
        var output = "Final: " + node.getName() + "\n";
        return output;
    }
}

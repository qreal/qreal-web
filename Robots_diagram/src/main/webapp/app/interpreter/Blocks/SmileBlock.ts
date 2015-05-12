class SmileBlock extends Block {
    static run(node): string {
        var name = "Smile: " + node.getName();
        return name;
    }
}

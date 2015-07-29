class Block {

    run(node): void {
    }

    static error(timeline, message): void {
        InterpretManager.error = true;
        timeline.stop();
        alert(message);
    }
}

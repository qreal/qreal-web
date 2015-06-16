class AnimationQueue {
    private animationArray: Array<Function> = [];

    public push(animationFunction: Function) {
        this.animationArray.push(animationFunction);
    }

    public next(): Function {
        if (this.animationArray.length) {
            return this.animationArray.shift();
        }
        return null;
    }

    public hasNext(): boolean {
        return this.animationArray.length != 0;
    }
}
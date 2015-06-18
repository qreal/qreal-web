class AnimationQueue {
    private animationArray: Array<Function> = [];
    private delays: Array<number> = [];

    public push(animationFunction: Function, delay: number) {
        this.animationArray.push(animationFunction);
    }

    public next(): Function {
        if (this.animationArray.length) {
            this.delays.shift();
            return this.animationArray.shift();
        }
        return null;
    }

    public hasNext(): boolean {
        return this.animationArray.length != 0;
    }

    public getNextDelay(): number {
        return this.delays[0];
    }
}
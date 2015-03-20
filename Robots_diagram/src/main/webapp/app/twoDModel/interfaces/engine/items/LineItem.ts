interface LineItem {
    getPath(): RaphaelPath;
    updateStart(x: number, y: number): void;
    updateEnd(x: number, y: number): void;
    hideHandles(): void;
    showHandles(): void;
    remove(): void;
}
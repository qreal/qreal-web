interface EllipseItem {
    updateCorner(oppositeCornerX: number, oppositeCornerY: number, x: number, y: number): void;
    hideHandles(): void;
    showHandles(): void;
    remove(): void;
}
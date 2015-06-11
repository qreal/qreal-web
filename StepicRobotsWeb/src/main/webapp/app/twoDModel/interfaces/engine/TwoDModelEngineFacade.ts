interface TwoDModelEngineFacade {
    setDrawLineMode(): void;
    setDrawWallMode(): void;
    setDrawPencilMode(): void;
    setDrawEllipseMode(): void;
    setNoneMode(): void;
    openDiagram(): void;
    showCheckResult(result): void;
    stopPlay(): void;
}
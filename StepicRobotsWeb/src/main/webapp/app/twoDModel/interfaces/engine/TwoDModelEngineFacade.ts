interface TwoDModelEngineFacade {
    setDrawLineMode(): void;
    setDrawWallMode(): void;
    setDrawPencilMode(): void;
    setDrawEllipseMode(): void;
    setNoneMode(): void;
    openDiagram(): void;
    displayTrace(traceJson): void;
    stopPlay(): void;
}
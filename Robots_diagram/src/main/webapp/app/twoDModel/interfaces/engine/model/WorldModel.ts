interface WorldModel {
    setDrawLineMode();
    setDrawWallMode();
    setDrawPencilMode();
    setDrawEllipseMode();
    getDrawMode();
    setNoneMode();
    getPaper();
    setCurrentElement(element);
}
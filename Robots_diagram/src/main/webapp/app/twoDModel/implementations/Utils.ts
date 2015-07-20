class Utils {

    public static toRadian(angle : number) : number {
        return angle * Math.PI / 180.0;
    }

    /**
     *
     * @param angle - in radians
     * @returns angle in degrees
     */
    public static toDegrees(angle : number) : number {
        return angle * 180.0 / Math.PI;
    }

    public static rotateVector(x : number, y : number, angle : number) : TwoDPosition {
        angle = Utils.toRadian(angle);
        var newX : number = x * Math.cos(angle) - y * Math.sin(angle);
        var newY : number = x * Math.sin(angle) + y * Math.cos(angle);
        return new TwoDPosition(newX, newY);
    }
}

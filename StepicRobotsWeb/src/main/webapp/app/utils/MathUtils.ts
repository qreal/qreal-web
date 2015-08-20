class MathUtils {

    public static toDeg(radians: number): number {
        return radians * (180 / Math.PI);
    }

    public static toRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
}
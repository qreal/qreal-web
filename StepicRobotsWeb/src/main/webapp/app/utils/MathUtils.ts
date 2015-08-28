class MathUtils {

    public static toDeg(radians: number): number {
        return radians * (180 / Math.PI);
    }

    public static toRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    public static twoPointLenght(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt(this.sqr(x1 - x2) + this.sqr(y1 - y2));
    }

    public static sqr(x: number): number {
        return x * x;
    }
}
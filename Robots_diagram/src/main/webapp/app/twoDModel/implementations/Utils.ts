/*
 * Copyright Anton Gulikov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class Utils {

    /**
     *
     * @param angle in degrees
     * @returns angle in radians
     */

    public static toRadian(angle : number) : number {
        return angle * Math.PI / 180.0;
    }

    /**
     *
     * @param angle in radians
     * @returns angle in degrees
     */
    public static toDegrees(angle : number) : number {
        return angle * 180.0 / Math.PI;
    }

    /**
     *
     * @param x
     * @param y
     * @param angle
     * @returns vector (x,y) rotated by angle degrees with rotation centr at (0,0)
     */

    public static rotateVector(x : number, y : number, angle : number) : TwoDPosition {
        angle = Utils.toRadian(angle);
        var newX : number = x * Math.cos(angle) - y * Math.sin(angle);
        var newY : number = x * Math.sin(angle) + y * Math.cos(angle);
        return new TwoDPosition(newX, newY);
    }
}

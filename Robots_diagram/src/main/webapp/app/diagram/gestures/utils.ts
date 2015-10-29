/*
 * Copyright Semen Yuriev
 * Copyright Artemii Bezguzikov
 * Copyright Vladimir Zakharov
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

module utils {
    export class Pair {
        first: number;
        second: number;

        constructor (public newFirst : number, public newSecond : number) {
            this.first = newFirst;
            this.second = newSecond;
        }
    }

    export class PairString {
        first: string;
        second: string;

        constructor (public curString: string) {
            var index = curString.indexOf(" ");
            this.first = curString.substr(0, index);
            this.second = curString.substr(index, curString.length - index);
        }

        getString() {
            return this.first + " - " + this.second;
        }
    }

    export interface PairArray {
        [index: number]: Pair;
        length: number;
        push(pair: Pair);
    }

    export interface PairArrayS {
        [index: number]: PairString;
        length: number;
        push(pairString: PairString);
    }
}
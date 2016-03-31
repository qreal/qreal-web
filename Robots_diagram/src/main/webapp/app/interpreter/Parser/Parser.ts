/*
 * Copyright Lada Gagina
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

class Parser {
    private expr: string;
    error;
    result;

    constructor (str: string) {
        this.expr = str;
    }

    parseCondition() {
        // Here we kinda adapt to normal lua grammar
        // In lua x = y + 2 will be accepted, while y = 2 will not
        var abstractSyntaxTree = JSON.parse(JSON.stringify(luaparse.parse("x = " + this.expr)));
        if (abstractSyntaxTree.hasOwnProperty("error")) {
            this.error = abstractSyntaxTree.error + abstractSyntaxTree.message;
            return;
        }
        // And we ignore our fictive assignment when walking ast
        var root = abstractSyntaxTree.body[0].init[0];
        this.result = this.calc(root);
    }

    parseFunction() {
        //And here we do not need to adapt
        var ast = JSON.parse(JSON.stringify(luaparse.parse(this.expr)));
        if (ast.hasOwnProperty("error")) {
            this.error = ast.error + ast.message;
            return;
        }

        for (var i = 0; i < ast.body.length; i++) {
            if (ast.body[i].type == "AssignmentStatement") {
                for (var j = 0; j < ast.body[i].variables.length; j++) {
                    InterpretManager.setVariable(ast.body[i].variables[j].name, this.calc(ast.body[i].init[0]));
                }
            }
            else {
                this.error = "Unresolved input";
                return;
            }
        }
    }

    private calc(node)
    {
        if (node.type == "BinaryExpression")
        {
            if (node.left != null && node.right != null)
            {
                switch (node.operator)
                {
                    case "+":
                        return this.calc(node.left) + this.calc(node.right);
                        break;
                    case "-":
                        return this.calc(node.left) - this.calc(node.right);
                        break;
                    case "*":
                        return this.calc(node.left) * this.calc(node.right);
                        break;
                    case "/":
                        return this.calc(node.left) / this.calc(node.right);
                        break;
                    case "^":
                        return this.calc(node.left) ^ this.calc(node.right);
                        break;
                    case ">":
                        return this.calc(node.left) > this.calc(node.right);
                        break;
                    case "<":
                        return this.calc(node.left) < this.calc(node.right);
                        break;
                    case ">=":
                        return this.calc(node.left) >= this.calc(node.right);
                        break;
                    case "<=":
                        return this.calc(node.left) <= this.calc(node.right);
                        break;
                    case "==":
                        return this.calc(node.left) == this.calc(node.right);
                        break;
                    case "or":
                    case "||":
                        return this.calc(node.left) || this.calc(node.right);
                        break;
                    case "and":
                    case "&&":
                        return this.calc(node.left) && this.calc(node.right);
                        break;
                    case "<":
                        return this.calc(node.left) < this.calc(node.right);
                        break;
                }
            }
        }

        if (node.type == "Identifier") {
            var variablesMap = InterpretManager.getVariablesMap();
            if (variablesMap[node.name] == null) {
                this.error = "No such variable:" + node.name;
                return 0;
            }
            return variablesMap[node.name];
        }

        if (node.type == "NumericLiteral")
        {
            return node.value;
        }

        this.error = "Unresolved input";
    }
}

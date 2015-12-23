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
        var ast = JSON.parse(JSON.stringify(luaparse.parse("x = " + this.expr)));
        if (ast.hasOwnProperty("error")) {
            this.error = ast.error + ast.message;
            return;
        }
        // And we ignore our fictive assignment when walking ast
        var root = ast.body[0].init[0];
        this.result = this.calc(root);
    }

    calc(node)
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
                    //TODO tableconstructor, tableindexing, functioncalls, concatenation, twodtable
                }
            }
        }

        if (node.type == "Identifier")
        {
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

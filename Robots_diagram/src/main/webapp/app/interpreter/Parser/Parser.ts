class Parser {
    private expr: string;
    private env;
    error;
    result;

    constructor (str: string, env) {
        this.expr = str;
        this.env = env;
    }

    parseCondition() {
        var ast = JSON.parse(JSON.stringify(luaparse.parse("x = " + this.expr)));
        var node = ast.body[0].init[0];
        this.result = this.calc(node);
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
                    case ">":
                        return this.calc(node.left) > this.calc(node.right);
                        break;
                    case "<":
                        return this.calc(node.left) < this.calc(node.right);
                        break;
                    //TODO tableconstructor, tableindexing, functioncalls, concatenation, twodtable
                    //TODO ^,>=,<=,==,or,and,&&,||,not
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

        this.error = "error";
    }
}

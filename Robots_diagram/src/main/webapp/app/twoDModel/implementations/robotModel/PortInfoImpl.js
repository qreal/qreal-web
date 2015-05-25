var PortInfoImpl = (function () {
    function PortInfoImpl(name, direction, nameAliases, reservedVariable, reservedVariableType) {
        this.nameAliases = [];
        this.reservedVariableType = 0 /* scalar */;
        this.name = name;
        this.direction = direction;
        this.nameAliases = nameAliases;
        this.reservedVariable = reservedVariable;
        this.reservedVariableType = reservedVariableType;
    }
    PortInfoImpl.prototype.getName = function () {
        return this.name;
    };
    PortInfoImpl.prototype.getDirection = function () {
        return this.direction;
    };
    PortInfoImpl.prototype.getNameAliases = function () {
        return this.nameAliases;
    };
    PortInfoImpl.prototype.getReservedVariable = function () {
        return this.reservedVariable;
    };
    PortInfoImpl.prototype.getReservedVariableType = function () {
        return this.reservedVariableType;
    };
    return PortInfoImpl;
})();
//# sourceMappingURL=PortInfoImpl.js.map
"use strict";
var Empleado = /** @class */ (function () {
    function Empleado(_nombre, _salario) {
        this.nombre = _nombre;
        this.salario = _salario;
    }
    Empleado.prototype.deducciones = function () {
        var descuentoAFP = 0.0725, descuentoISSS = 0.03;
        var salarioNeto = this.salario * (1 - descuentoAFP - descuentoISSS);
        return salarioNeto;
    };
    return Empleado;
}());

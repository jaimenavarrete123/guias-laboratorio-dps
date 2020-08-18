"use strict";
var Calculadora = /** @class */ (function () {
    function Calculadora(_numero1, _numero2) {
        this.numero1 = _numero1;
        this.numero2 = _numero2;
    }
    Calculadora.prototype.operacionesBasicas = function () {
        var resultado;
        //Suma
        resultado = this.numero1 + this.numero2;
        console.log('El resultado de la suma (+) es: ' + resultado);
        //Resta
        resultado = this.numero1 - this.numero2;
        console.log('El resultado de la resta (-) es: ' + resultado);
        //Multiplicacion
        resultado = this.numero1 * this.numero2;
        console.log('El resultado de la multiplicacion (*) es: ' + resultado);
        //Division
        if (this.numero2) {
            resultado = this.numero1 / this.numero2;
            console.log('El resultado de la division (/) es: ' + resultado);
        }
        else {
            console.log('No se puede dividir por 0');
        }
    };
    return Calculadora;
}());

"use strict";
var Rombo = /** @class */ (function () {
    function Rombo(vertical, horizontal) {
        this.DiagonalVertical = vertical;
        this.DiagonalHorizontal = horizontal;
    }
    Rombo.prototype.area = function () {
        return this.DiagonalVertical * this.DiagonalHorizontal;
    };
    return Rombo;
}());

class Rombo {
    DiagonalVertical:number;
    DiagonalHorizontal:number;

    constructor(vertical:number, horizontal:number) {
        this.DiagonalVertical = vertical;
        this.DiagonalHorizontal = horizontal;
    }

    area():number {  
        return this.DiagonalVertical * this.DiagonalHorizontal;
    }
}
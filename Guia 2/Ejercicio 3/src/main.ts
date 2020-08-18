class Empleado {
    nombre:string;
    salario:number;

    constructor(_nombre:string, _salario:number) {
        this.nombre = _nombre;
        this.salario = _salario;
    }

    deducciones():number {
        const descuentoAFP:number = 0.0725,
              descuentoISSS:number = 0.03;

        const salarioNeto = this.salario * (1 - descuentoAFP - descuentoISSS)
        
        return salarioNeto;
    }
}
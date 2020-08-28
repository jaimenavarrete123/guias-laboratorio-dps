import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ejercicios1y2';

  // Ejercicio 1

  cantEmpleados = 0;
  empleados = [];

  limpiarRegistros() {
    let tabla = document.getElementById('tablaEmpleados'),
        registrosTabla = document.querySelectorAll('.registroTabla');

    if(registrosTabla) {
      registrosTabla.forEach(item => {
        tabla.removeChild(item);
      })
    }

    this.cantEmpleados = 0;
    this.empleados = [];
  }

  obtenerEmpleados() {
    this.limpiarRegistros();

    let formEmpleados = document.getElementById('cantEmpleados') as HTMLInputElement;

    this.cantEmpleados = parseInt(formEmpleados.value, 10);
    formEmpleados.value = '';

    if(this.cantEmpleados > 0) {
      for(let i=0; i<this.cantEmpleados; i++) {
        this.empleados.push({id:i+1, nombre:'Anonimo', salario:0, descuento:0, salarioNeto:0})
      }
    }
  }

  modificarSalario(id:number) {
    let empleadoMod = this.empleados[id-1],
        nuevoSalario = document.querySelectorAll('.registroTabla .salarioEmpleado')[id-1] as HTMLInputElement,
        nuevoDescuento = document.querySelectorAll('.registroTabla .descuentoEmpleado')[id-1] as HTMLInputElement,
        nuevoSalarioNeto = document.querySelectorAll('.registroTabla .salarioNetoEmpleado')[id-1] as HTMLInputElement;

    empleadoMod.salario = nuevoSalario.value;
    empleadoMod.descuento = (empleadoMod.salario * (0.234)).toFixed(2);
    empleadoMod.salarioNeto = (empleadoMod.salario - empleadoMod.descuento).toFixed(2);

    nuevoDescuento.value = empleadoMod.descuento;
    nuevoSalarioNeto.value = empleadoMod.salarioNeto;
  }

  // Ejercicio 2
}

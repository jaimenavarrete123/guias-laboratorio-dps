import { Component } from '@angular/core';
import { Alumno } from './models/alumno'
import { ArticulosService } from './articulos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crudAngular';


  //
  // CRUD ANGULAR SIN BASES DE DATOS
  //


  // Arreglo del tipo Alumno, que tiene 3 registros almacenados
  alumnoArray: Alumno[] = [
    {id:1, name: "Alex", lastname: "Campos", age: 35},
    {id:1, name: "Maria", lastname: "Lopez", age: 20},
    {id:1, name: "Juan", lastname: "Castro", age: 25}
  ];

  selectedAlumno: Alumno = {id: 0, name: '', lastname: '', age: 0 };

  openForEdit(alumno: Alumno): void {
    this.selectedAlumno = alumno;
  }

  addOrEdit(): void {
    if(this.selectedAlumno.id === 0) {
      this.selectedAlumno.id = this.alumnoArray.length + 1;
      this.alumnoArray.push(this.selectedAlumno);
    }

    this.selectedAlumno = {id: 0, name: '', lastname: '', age: 0 };
  }

  delete(): void {
    if(confirm('Esta seguro de eliminar el registro?')) {
      this.alumnoArray = this.alumnoArray.filter(alumno => alumno != this.selectedAlumno);
      this.selectedAlumno = {id: 0, name: '', lastname: '', age: 0 };
    }
  }


  //
  // CRUD ANGULAR CON BASES DE DATOS
  //


  articulos = null;

  art = {
    codigo: 0,
    descripcion: null,
    precio: null
  }

  constructor(private articulosServicio: ArticulosService) {}

  ngOnInit() {
    this.recuperarTodos();
  }

  recuperarTodos() {
    this.articulosServicio.recuperarTodos().subscribe(result => this.articulos = result);
  }

  alta() {
    this.articulosServicio.alta(this.art).subscribe(datos => {
      if(datos['resultado'] == 'OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
        this.art = {codigo: 0, descripcion: null, precio: null};
      }
    });
  }

  baja(codigo) {
    if(confirm('Esta seguro de eliminar el registro?')) {
      this.articulosServicio.baja(codigo).subscribe(datos => {
        if(datos['resultado'] == 'OK') {
          alert(datos['mensaje']);
          this.recuperarTodos();
        }
      });
    }
  }

  modificacion() {
    this.articulosServicio.modificacion(this.art).subscribe(datos => {
      if(datos['resultado'] == 'OK') {
        alert(datos['mensaje']);
        this.recuperarTodos();
        this.art = {codigo: 0, descripcion: null, precio: null};
      }
    });
  }

  seleccionar(codigo) {
    this.articulosServicio.seleccionar(codigo).subscribe(result => this.art = result[0]);
  }

  hayRegistros() {
    return true;
  }
}

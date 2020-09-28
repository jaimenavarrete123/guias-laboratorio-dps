import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../models/alumno';

import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  // Arreglo del tipo Alumno, que tiene 3 registros almacenados
  alumnoArray: Alumno[] = [
    {id:1, name: "Alex", lastname: "Campos", age: 35, direccion: "Direccion1", telefono: "12345678", email: "correo1@gmail.com"},
    {id:2, name: "Maria", lastname: "Lopez", age: 20, direccion: "Direccion2", telefono: "87654321", email: "email2@hotmail.com"},
    {id:3, name: "Juan", lastname: "Castro", age: 25, direccion: "Direccion3", telefono: "77558820", email: "correo3@outlook.com"}
  ];

  selectedAlumno: Alumno = {id: 0, name: '', lastname: '', age: 0 , direccion: '', telefono: '', email: ''};

  openForEdit(alumno: Alumno): void {
    this.selectedAlumno = alumno;
  }

  addOrEdit(): void {
    if(this.selectedAlumno.id === 0) {
      let nombre = document.getElementById('alNombre') as HTMLInputElement,
          apellido = document.getElementById('alApellido') as HTMLInputElement,
          edad = document.getElementById('alEdad') as HTMLInputElement,
          direccion = document.getElementById('alDireccion') as HTMLInputElement,
          telefono = document.getElementById('alTelefono') as HTMLInputElement,
          email = document.getElementById('alEmail') as HTMLInputElement

      if(nombre.value && apellido.value && edad.value && direccion.value && telefono.value && email.value) {
        if(email.validity.valid && edad.validity.valid) {
          this.selectedAlumno.id = this.alumnoArray.length + 1;
          this.alumnoArray.push(this.selectedAlumno);
        }
        else {
          alert('La edad y/o el email no tienen el formato correcto');
        }
      }
      else {
        alert('Debe rellenar todos los campos');
      }
    }

    this.selectedAlumno = {id: 0, name: '', lastname: '', age: 0 , direccion: '', telefono: '', email: ''};
  }

  delete(): void {
    if(confirm('Esta seguro de eliminar el registro?')) {
      this.alumnoArray = this.alumnoArray.filter(alumno => alumno != this.selectedAlumno);
      this.selectedAlumno = {id: 0, name: '', lastname: '', age: 0 , direccion: '', telefono: '', email: ''};
    }
  }

}

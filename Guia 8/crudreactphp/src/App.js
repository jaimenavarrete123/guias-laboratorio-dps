import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function App() {
  const baseUrl="http://localhost/apiPhpEscuela/";
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [alumnoSeleccionado, setalumnoSeleccionado]=useState({
    id: '',
    nombre: '',
    apellido: '',
    edad: ''
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setalumnoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
    console.log(alumnoSeleccionado);
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    var f = new FormData();
    f.append("nombre", alumnoSeleccionado.nombre);
    f.append("apellido", alumnoSeleccionado.apellido);
    f.append("edad", alumnoSeleccionado.edad);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    var f = new FormData();
    f.append("nombre", alumnoSeleccionado.nombre);
    f.append("apellido", alumnoSeleccionado.apellido);
    f.append("edad", alumnoSeleccionado.edad);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: alumnoSeleccionado.id}})
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(alumno=>{
        if(alumno.id===alumnoSeleccionado.id){
          alumno.nombre=alumnoSeleccionado.nombre;
          alumno.apellido=alumnoSeleccionado.apellido;
          alumno.edad=alumnoSeleccionado.edad;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: alumnoSeleccionado.id}})
    .then(response=>{
      setData(data.filter(alumno=>alumno.id!==alumnoSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarAlumno=(alumno, caso)=>{
    setalumnoSeleccionado(alumno);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[])

  return (
    <div style={{textAlign: 'center'}}>
<br />
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>apellido</th>
          <th>edad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(alumno=>(
          <tr key={alumno.id}>
            <td>{alumno.id}</td>
            <td>{alumno.nombre}</td>
            <td>{alumno.apellido}</td>
            <td>{alumno.edad}</td>
          <td>
          <button className="btn btn-primary" onClick={()=>seleccionarAlumno(alumno, "Editar")}>Editar</button> {"  "}
          <button className="btn btn-danger" onClick={()=>seleccionarAlumno(alumno, "Eliminar")}>Eliminar</button>
          </td>
          </tr>
        ))}


      </tbody> 

    </table>


    <Modal isOpen={modalInsertar}>
      <ModalHeader>Insertar alumno</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
          <br />
          <label>apellido: </label>
          <br />
          <input type="text" className="form-control" name="apellido" onChange={handleChange}/>
          <br />
          <label>edad: </label>
          <br />
          <input type="text" className="form-control" name="edad" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
      </ModalFooter>
    </Modal>


    
    <Modal isOpen={modalEditar}>
      <ModalHeader>Editar alumno</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre: </label>
          <br />
          <input type="text" className="form-control" name="nombre" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.nombre}/>
          <br />
          <label>apellido: </label>
          <br />
          <input type="text" className="form-control" name="apellido" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.apellido}/>
          <br />
          <label>edad: </label>
          <br />
          <input type="text" className="form-control" name="edad" onChange={handleChange} value={alumnoSeleccionado && alumnoSeleccionado.edad}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el alumno {alumnoSeleccionado && alumnoSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;

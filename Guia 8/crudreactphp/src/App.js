import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';

function App() {
  // const baseUrl="http://localhost/apiPhpEscuela/";
  // const baseUrl="http://localhost:8080/guias-laboratorio-dps/Guia%208/crudreactphp/apiPhpEscuela/";
  const baseUrl="https://lab-dps-jaimenavarrete.000webhostapp.com/Guia8/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState({
    id: '',
    nombre: '',
    existencias: 0
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setProductoSeleccionado((prevState)=>({
      ...prevState,
      [name]: value
    }))
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
      console.log(response.data);
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    let f = new FormData();
    f.append("nombre", productoSeleccionado.nombre);
    f.append("existencias", productoSeleccionado.existencias);
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
    let f = new FormData();
    f.append("nombre", productoSeleccionado.nombre);
    f.append("existencias", productoSeleccionado.existencias);
    f.append("METHOD", "PUT");
    await axios.post(baseUrl, f, {params: {id: productoSeleccionado.id}})
    .then(response=>{
      let dataNueva = data;
      dataNueva.map(producto=>{
        if(producto.id===productoSeleccionado.id){
          producto.nombre=productoSeleccionado.nombre;
          producto.existencias=productoSeleccionado.existencias;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    let f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, {params: {id: productoSeleccionado.id}})
    .then(response=>{
      setData(data.filter(producto=>producto.id!==productoSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarProducto=(producto, caso)=>{
    setProductoSeleccionado(producto);

    (caso==="Editar")?
    abrirCerrarModalEditar():
    abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  },[]);

  return (
    <div style={{textAlign: 'center'}}>
      <br />
      <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
      <p>Hecho por: Jaime Eduardo Navarrete Cubías</p>
      <br/><br/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Existencias</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((producto, index)=>(
            <tr key={index}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.existencias}</td>
            <td>
            <button className="btn btn-primary" onClick={()=>seleccionarProducto(producto, "Editar")}>Editar</button> {"  "}
            <button className="btn btn-danger" onClick={()=>seleccionarProducto(producto, "Eliminar")}>Eliminar</button>
            </td>
            </tr>
          ))}


        </tbody> 

      </table>


      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar producto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
            <br />
            <label>Existencias: </label>
            <br />
            <input type="number" className="form-control" name="existencias" onChange={handleChange} min="0" />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>


      
      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar producto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="nombre" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.nombre}/>
            <br />
            <label>Existencias: </label>
            <br />
            <input type="number" className="form-control" name="existencias" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.existencias} min="0"/>
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
        ¿Estás seguro que deseas eliminar el producto {productoSeleccionado && productoSeleccionado.nombre}?
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

import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const EmpleadoForm = (props) => {

  const initialStateValues = {
    nombre: "",
    apellido: "",
    cargo: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addOrEditEmpleado(values);
    setValues({ ...initialStateValues });
  };

  const getEmpleadoById = async (id) => {
    const doc = await db.collection("Empleados").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      if (props.currentId !== null && props.currentId !== undefined) {
        getEmpleadoById(props.currentId);
      }
    }
  }, [props.currentId]);

  return (
    <form onSubmit={handleSubmit} className="card card-body border-primary">
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">contact_page</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese nombre"
          value={values.nombre}
          name="nombre"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">contact_page</i>
        </div>
        <input
          type="text"
          value={values.apellido}
          name="apellido"
          placeholder="Ingrese apellido"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">assignment_ind</i>
        </div>
        <input
          type="text"
          value={values.cargo}
          name="cargo"
          placeholder="Ingrese cargo"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary btn-block">
        {props.currentId === "" ? "Guardar" : "Actualizar"}
      </button>
    </form>
  );
};

export default EmpleadoForm;
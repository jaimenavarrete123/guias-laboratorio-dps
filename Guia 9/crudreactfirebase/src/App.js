import React from "react";
import logo from './logo.svg';
import './App.css';
import Empleado from "./componentes/Empleado";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App container p-4">
      <div className="row">
        <Empleado />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

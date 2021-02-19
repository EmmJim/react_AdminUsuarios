import React, {Fragment, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Swal from 'sweetalert2';

import clienteAxios from '../config/axios';

const NuevoUsuario = (props) => {

    //Generar state como objeto
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        status: true,
        observaciones: ''
    });

    const [error, guardarError] = useState(false);

    const {nombre, apellido, correo, observaciones} = usuario;

    const actualizarState = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const crearNuevoUsuario = e => {
        e.preventDefault();

        //Validar
        if(nombre.trim() === '' || apellido.trim() === '' || correo.trim() === '' || observaciones.trim() === ''){
            guardarError(true);
            return;
        }

        guardarError(false);

        Swal.fire('Usuario Agregado Correctamente');
        //Enviar la peticion a axios
        clienteAxios.post('/crear', usuario)
            .then(respuesta => {

                props.guardarConsultar(true);
                //Redireccionar
                props.history.push('/');
            })
    }

    return (  
        <Fragment>
            <nav className="navbar navbar-dark bg-primary d-flex justify-content-center">
                <h1 className="text-center my-3">Crear Usuario</h1>
            </nav>
            <div className="container">
                <div className="row my-5">
                    <div className="col-12 d-flex justify-content-end">
                        <Link to={'/'} className="btn btn-primary">Volver</Link>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col mx-auto">
                        <form 
                            onSubmit={crearNuevoUsuario}
                            className="bg-dark p-5 bordered">
                            <div className="form-group">
                                <label htmlFor="nombre" className="text-white font-weight-bold">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    placeholder="Nombre Usuario"
                                    name="nombre"
                                    onChange={actualizarState}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="apellido" className="text-white font-weight-bold">Apellido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apellido"
                                    placeholder="Apellido Usuario"
                                    name="apellido"
                                    onChange={actualizarState}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="correo" className="text-white font-weight-bold">Correo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="correo"
                                    placeholder="Correo Usuario"
                                    name="correo"
                                    onChange={actualizarState}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="observaciones" className="text-white font-weight-bold">Observaciones</label>
                                <textarea
                                    className="form-control"
                                    name="observaciones"
                                    id="observaciones"
                                    rows="6"
                                    onChange={actualizarState}
                                ></textarea>
                            </div>

                            <input type="submit" className="btn btn-primary mt-4 w-100 p-3 text-uppercase font-weight-bold" value="Crear Nuevo Usuario" />

                            {error ? <p className="alert alert-danger my-3 text-center">Todos los campos son obligatorios</p> : null}
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default withRouter(NuevoUsuario);
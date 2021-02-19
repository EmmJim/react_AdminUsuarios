import React, {Fragment, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';

import clienteAxios from '../config/axios';

const EditarUsuario = (props) => {


    //States
    const [usuarioact, guardarUsuarioAct] = useState({
        nombre: props.usuario.nombre,
        apellido: props.usuario.apellido,
        correo: props.usuario.correo,
        status: props.usuario.status,
        observaciones: props.usuario.observaciones
    });

    const {nombre, apellido, correo, status, observaciones} = usuarioact;

    const [error, guardarError] = useState(false);


    if(!props.usuario) {
        props.history.push('/');
        return null;
    }

    const actualizarState = e => {
        guardarUsuarioAct({
            ...usuarioact,
            [e.target.name]: e.target.value
        })
    }

    const editarUser = e => {
        e.preventDefault();

        //Validar
        if(nombre.trim() === '' || apellido.trim() === '' || correo.trim() === '' || observaciones.trim() === ''){
            guardarError(true);
            return;
        }

        guardarError(false);

        //Enviar la peticion a axios
        clienteAxios.put(`/editar/${props.usuario._id}`, usuarioact)
            .then(respuesta => {
                
                props.guardarConsultar(true);
                props.history.push('/');
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (  
        <Fragment>
            <nav className="navbar navbar-dark bg-primary d-flex justify-content-center">
                <h1 className="text-center my-3">Editar Usuario</h1>
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
                            onSubmit={editarUser}
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
                                    value={nombre}
                                    
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
                                    value={apellido}
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
                                    value={correo}
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
                                    value={observaciones}
                                    onChange={actualizarState}
                                ></textarea>
                            </div>

                            <input type="submit" className="btn btn-primary mt-4 w-100 p-3 text-uppercase font-weight-bold" value="Editar Usuario" />

                            {error ? <p className="alert alert-danger my-3 text-center">Todos los campos son obligatorios</p> : null} 
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default withRouter(EditarUsuario);
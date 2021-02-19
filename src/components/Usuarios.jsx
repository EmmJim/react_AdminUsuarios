import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';


const Usuarios = (props) => {

    const {usuarios, guardarConsultar} = props;

    // if(usuarios.length === 0)

    //Eliminar un registro
    const eliminarUsuario = id => {

            Swal.fire({
                title: 'Estas Seguro?',
                text: "Un usuario eliminado no se puede recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
            if (result.isConfirmed) {

                //Alerta de eliminado
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                //Eliminado de la base de datos
                clienteAxios.delete(`/eliminar/${id}`)
                    .then(respuesta => {
                        guardarConsultar(true);
                        //Redireccionar
                        props.history.push('/');
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            })

    }

    return (  
        <Fragment>
            <nav className="navbar navbar-dark bg-primary d-flex justify-content-center">
                <h1 className="text-center my-3">Administrador de Usuarios</h1>
            </nav>
            <div className="container">
                <div className="row my-4">
                    <div className="col d-flex justify-content-end">
                        <Link to={'/crear'} className="btn btn-primary">Nuevo Usuario</Link>
                    </div>
                </div>
                
                <div className="row my-5">
                    <div className="col">
                        <table className="table table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Correo</th>
                                    <th>Observaciones</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map( usuario => (
                                    <tr key={usuario._id}>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.observaciones}</td>
                                        <td>{usuario.status ? 'Activo' : 'Inactivo'}</td>
                                        <td className="px-0">
                                        <Link to={`/editar/${usuario._id}`} className="btn btn-success">Editar</Link>
                                        </td>
                                        <td className="px-0">
                                            <button
                                                type="button"  
                                                className="btn btn-danger"
                                                onClick={() => eliminarUsuario(usuario._id)}
                                            >Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default withRouter(Usuarios);
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import clienteAxios from './config/axios';

//Componentes
import Usuarios from './components/Usuarios';
import NuevoUsuario from './components/NuevoUsuario';
import EditarUsuario from './components/EditarUsuario';

function App() {

  // State de la app
  const [usuarios, guardarUsuarios] = useState([]);
  const [consultar, guardarConsultar] = useState(true);

  useEffect(() => {
    if(consultar) {
      const consultarAPI = () => {
        clienteAxios.get('/usuarios')
          .then(respuesta => {
            guardarUsuarios(respuesta.data);

            guardarConsultar(false);
          })
          .catch(error => {
            console.log(error);
          })
      }
      consultarAPI();
    }

  }, [consultar]);

  return (
    <Router>
      <Switch>
        <Route
          exact path="/"
          component={() => <Usuarios usuarios={usuarios} guardarConsultar = {guardarConsultar} />}
        />
        <Route
          exact path="/crear"
          component={() => <NuevoUsuario guardarConsultar={guardarConsultar} />}
        />
        <Route
          exact path="/editar/:id"
          render={(props) => {
            const usuario = usuarios.filter(usuario => usuario._id === props.match.params.id);



            return(
              <EditarUsuario 
                usuario={usuario[0]}
                guardarConsultar={guardarConsultar}
              />
            )
          }}
        />
      </Switch>
    </Router>
    
  );
}

export default App;

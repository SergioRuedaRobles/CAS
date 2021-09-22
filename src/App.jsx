import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import AñadirToma from './components/AñadirToma';
import Cuidador from './components/Cuidador';
import InfoCliente from './components/InfoCliente';
import Login from './components/Login';
import Navbar from './components/Navbar';
import NuevoPaciente from './components/NuevoPaciente';
import {auth} from './firebase'
import Cliente from './components/Cliente';
import DatosCliente from './context/DatosCliente';
import NotFound from './components/NotFound';
import DatosCuidador from './context/DatosCuidador';
import Historial from './components/Historial';
import ZonaControl from './components/ZonaControl';
import EditarCliente from './components/EditarCliente';
import InfoPresion from './components/infoMedidas/InfoPresion';
import InfoGlucosa from './components/infoMedidas/InfoGlucosa';
import InfoCAS from './components/InfoCAS';
import { Link } from 'react-router-dom';
import Mensajeria from './components/Mensajeria';
import Medicamentos from './components/Medicamentos';

const App = () => {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })
  }, []) //Solo se ejecuta al cargar el componente

  return firebaseUser !== false ? (
    <DatosCliente>
      <DatosCuidador>
        <Router>
          <div className="container">
            <Navbar firebaseUser={firebaseUser}/>
            <Switch>
              <Route path="/login" exact>
                <Login/>
              </Route>
              <Route path="/cuidador" exact>
                <Cuidador/>
              </Route>
              <Route path="/nuevo-paciente" exact>
                <NuevoPaciente/>
              </Route>
              <Route path="/anadir-toma/:idCliente" exact>
                <AñadirToma/>
              </Route>
              <Route path="/zona-control/:idCliente" exact>
                <ZonaControl/>
              </Route>
              <Route path="/info-cliente/:idCliente" exact>
                <InfoCliente/>
              </Route>
              <Route path="/info-cliente/:idCliente" exact>
                <EditarCliente/>
              </Route>
              <Route path="/historial/:idCliente" exact>
                <Historial/>
              </Route>
              <Route path="/medicamentos/:idCuidador" exact>
                <Medicamentos/>
              </Route>
              <Route path="/cliente" exact>
                <Redirect to="/" />
              </Route>
              <Route path="/cliente/:idCliente" exact>
                <Cliente/>
              </Route>
              <Route path="/info-presion" exact>
                <InfoPresion/>
              </Route>
              <Route path="/info-glucosa" exact>
                <InfoGlucosa/>
              </Route>
              <Route path="/info-cas" exact>
                <InfoCAS/>
              </Route>
              <Route path="/mensajeria/:idCliente" exact>
                <Mensajeria/>
              </Route>
              <Route path="/" exact>
                <h1 className="text-center mt-5 font-weight-bold text-info">Bienvenidos a CAS</h1>
                <h3 className="text-center">Una aplicación para ayudarte a gestionar las tomas de medicamentos</h3>
                <div className="text-center">
                  <Link className="btn btn-info" to='/info-cas'>¿Cómo funciona?</Link>
                </div>
              </Route>
              <Route path="*">
                <NotFound/>
              </Route>
            </Switch>
          </div>
        </Router>
      </DatosCuidador>
    </DatosCliente>
  ) : (
    <h2>Loading...</h2>
  )
}

export default App;
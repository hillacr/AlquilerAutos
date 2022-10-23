import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import Footer from './components/Footer';



//Cliente

import { MantenimientoPersona } from './components/clientes/MantenimientoPersona'


//import axios from 'axios';

import './custom.css'
import { MantenimientoTipoVehiculo } from './components/clientes/MantenimientoTipoVehiculo';
import { MantenimientoVehiculo } from './components/clientes/MantenimientoVehiculo';
import { MantenimientoAlquiler} from './components/clientes/MantenimientoAlquiler';
import { AlquilerVehiculos } from './components/clientes/AlquilerVehiculos';
import { Logs } from './components/clientes/Logs';
export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <div>
                <Layout>
                    <Route exact path='/' component={AlquilerVehiculos} />
                    <Route path='/MantenimientoPersona' component={MantenimientoPersona} />
                    <Route path='/MantenimientoTipoVehiculo' component={MantenimientoTipoVehiculo} />
                    <Route path='/MantenimientoVehiculo' component={MantenimientoVehiculo} />
                    <Route path='/MantenimientoAlquiler' component={MantenimientoAlquiler} />
                    <Route path='/AlquilerVehiculos' component={AlquilerVehiculos} />
                    <Route path='/Logs' component={Logs} />
                </Layout>
                <Footer />
            </div>
        );
    }
}

﻿import React, { Component, useEffect, useState } from 'react';
import { Container} from 'reactstrap';
import 'jquery/dist/jquery.min.js';
import Swal from 'sweetalert2'
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import Catalog from "react-catalog-view";
import Formulario from '../mantenimientos_forms/formAlquilar';
import VehiculoService from "../../services/VehiculoService";
import AlquilerService from "../../services/AlquilerService";
import { FormularioModal } from '../components_forms/ventanaModal';
//modal
export class AlquilerVehiculos extends Component {
   static displayName = AlquilerVehiculos.name;
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          modalTitulo: "Alquilar Vehículo",
          labelButton: "Alquilar",
          listaVehiculos:[],
          listaAlquileres:[],
          data:[],
        };
    }

    async ObtenerListadoAlquileres() {
      AlquilerService.getAll()
        .then((response) => {
          this.setState({ listaAlquileres: response.data });
        })
        .catch((e) => {
        });
    }


    async ObtenerAlquilerVehiculos() {
      VehiculoService.getAll()
      .then((response) => {
        var listaImagenes=['https://es.digitaltrends.com/wp-content/uploads/2018/07/m-de-volvo-carros-bajo-demanda-head.jpg?fit=720%2C480&p=1','https://st1.uvnimg.com/d4/4a/006304a74db4902c0b4d8d8026c8/chevrolet-corvette-c8-stingray-2020-1280-08.jpg','https://www.elcarrocolombiano.com/wp-content/uploads/2019/09/20190930-TOP-100-LOS-CARROS-MAS-VENDIDOS-DEL-MUNDO-ENTRE-ENERO-Y-JULIO-DE-2019-01.jpg','https://mitsubishi.cr/wp-content/uploads/2020/03/Foto-banner-gris-638x395px-11.png', 'https://d1ypc8j62c29y8.cloudfront.net/fullsize/1/7/1/f3551b4f12eac8fcbf983fd2d7cc14f0e16b5171.png'];
        const options = response.data.map(function (row) {
          const random = Math.floor(Math.random() * listaImagenes.length);
          const randN =Math.floor(Math.random() * (50000 - 25000 + 1) + 25000);
          return { id: row.id, title: row.tipo_vehiculo.descripcion, description: "Placa: "+row.placa, image:listaImagenes[random], placa: row.placa, tipo_vehiculo: row.tipo_vehiculo  }
      });

    this.setState({ listaVehiculos: options });

      })
      .catch((e) => {
      });
    }
    async componentDidMount() {
      this.ObtenerAlquilerVehiculos();
      this.ObtenerListadoAlquileres();
}
    onClickAlquilar = async (e) => {
      this.setState({ data: e });     
      this.setState({ modal: !this.state.modal });
      this.setState({ labelButton: "Alquilar" });
      this.setState({ modalTitulo: "Alquilar Vehiculo" });
  }


  onClickProcesarAlquiler = async (Alquiler) => {
    if(this.state.listaAlquileres!=[]&&this.state.listaAlquileres.find(o => new Date(o.fecha).setHours(0,0,0,0) === new Date().setHours(0,0,0,0))&&this.state.listaAlquileres.find(o => o.persona.id === Alquiler.idPersona)){
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Esa persona ya tiene un alquiler el día de hoy',
      })
      return;
    }

    if(this.state.listaAlquileres!=[]&&this.state.listaAlquileres.find(o => new Date(o.fecha).setHours(0,0,0,0) === new Date().setHours(0,0,0,0))&&this.state.listaAlquileres.find(o => o.vehiculo.id === Alquiler.idVehiculo)){
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ese vehiculo ya está alquilado el día de hoy',
    })
    return;
  }
          AlquilerService.create(Alquiler)
          .then((response)=>{
            console.log(response);
            this.ObtenerListadoAlquileres();
            this.setState({ modal: false });
            Swal.fire({
              icon: 'success',
              title: 'Se ha alquilado el vehiculo',
              showConfirmButton: false,
              timer: 1500
            })
          })          .catch((e) => {
          });       
    
  

          
  }

   onClickCerrarModal = () => {
      this.setState({ modal: false });
      this.setState({ mensajeFormulario: "" });
    }
    
    ProductData(props){
      const CONTENT_KEYS = 
      {             
         imgKey: "image",
         cardTitleKey: "title",
         cardDescriptionKey: "description",
         priceKey: "price",
         discountedPriceKey: "discounted",
         priceCurrencyKey: "currency",
         discountCurrencyKey: "currency"
      };
	
      return(
        <Catalog
            data = {this.state.listaVehiculos}		
           // Array of JSON Objects (required)
           contentKeys={CONTENT_KEYS}  
           // JSON Object defining the keys that will be 
           // used from the data array, keys should match. (required)
           skeleton={0}
           // Any non zero number will override default cards
           // and will show that many skeleton cards.           
           cardSize="sm"
           // Card sizes, sm, md and lg for small, medium  and large
           // Enter text for action button one 
           // or pass empty string to hide.  
           btnTwoText="Alquilar Hoy"
           // Enter text for action button two 
           // or pass empty string to hide.
           btnTwoHandler={(args, event, row)=>{
                console.log(event);
                this.onClickAlquilar(event);
           }}
           imageClickHandler={(args, event, row)=>{
            // 'objectData' returns object data from 'data' prop
            // any arguments passed will be before 'event' 
            // and 'objectData'
           }}

           
            
        ></Catalog>
      )
  }
    render() {
        return (
            <main>
                <div className="row-full">Catálogo de Vehículos
                </div>
               <Container>
               {this.ProductData()}
               <br></br>
               <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>

                <Formulario labelButton={this.state.labelButton} data={this.state.data} mensaje={this.state.mensajeFormulario} onClickProcesarAlquiler={this.onClickProcesarAlquiler} />

               </FormularioModal>
               </Container>
               

                
            </main>
        );
    }
    
}
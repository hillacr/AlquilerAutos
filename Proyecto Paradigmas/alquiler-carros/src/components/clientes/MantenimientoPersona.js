import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';
import Swal from 'sweetalert2'
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formSocio';
import PersonaDataService from "../../services/PersonaService";

export class MantenimientoPersona extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaPersonas: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1, //agregar
            modalTitulo: "Registrar Persona",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: ["Id", "Cedula", "Nombre", "Acción"],
        };

    }

    async ObtenerListadoPersonas() {
      await PersonaDataService.getAll()
      .then((response) => {
        this.setState({ listaPersonas: response.data });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    }


    onClickNuevaPersona = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Persona" });
    }

    onClickActualizarPersona = async (id) => {
        this.setState({ proceso: 2 });//proceso 2 actualizar
        await PersonaDataService.get(id)
        .then((response) => {
          this.setState({ data: response.data });
          console.log(response.data);//
        })
        .catch((e) => {
          console.log(e);
        });
      
      this.setState({ modal: !this.state.modal });
      this.setState({ labelButton: "Actualizar" });
      this.setState({ modalTitulo: "Actualizar Persona" });
    }

    onClickCerrarModal = () => {
      this.setState({ modal: false });
      this.setState({ mensajeFormulario: "" });
    }

    async componentDidMount() {

        await this.ObtenerListadoPersonas();

        setTimeout(() => {

            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

    }

  onClickProcesarPersona = async (Persona) => {
    
    console.log(Persona);
    $.fn.dataTable.ext.errMode = 'none';
      let respuesta = {};

      if (this.state.proceso === 1){
          PersonaDataService.create(Persona)
          .then((response)=>{
            this.setState({ mensajeFormulario: respuesta.mensaje });
            
            this.setState({ modal: false });
            this.ObtenerListadoPersonas();
            setTimeout(() => {
                $('#example').DataTable(
                    {
                        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                    });
            }, 100);
          })          .catch((e) => {
            console.log(e);
          });
        }
      else {
        $.fn.dataTable.ext.errMode = 'none';
          PersonaDataService.update(Persona.id, JSON.stringify(Persona))
          .then((response) => {
            this.setState({ mensajeFormulario: respuesta.mensaje });
            
            this.setState({ modal: false });
            this.ObtenerListadoPersonas();
            setTimeout(() => {
                $('#example').DataTable(
                    {
                        "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                    });
            }, 100);
            
          })
          .catch((e) => {
            console.log(e);
          });
      }
  }
  onClickEliminarPersona = async (id)=>{
    console.log(id);
    PersonaDataService.remove(parseInt(id))
      .then((response) => {
        this.setState({ modal: false });
        this.ObtenerListadoPersonas();
        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
      })
      .catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La persona que intenta eliminar tiene un alquiler',
        })
      });
  }

    body = () => {
        return this.state.listaPersonas.map((item, index) => (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.identificacion}</td>
                <td>{item.nombre}</td>
                <td><Button color="primary" onClick={() => this.onClickActualizarPersona(item.id)} style={{ marginRight: "1vw" }}>Editar
                    </Button>
                    <Button color={"danger" } onClick={() => this.onClickEliminarPersona(item.id)}> Eliminar
                    </Button>
                </td>

            </tr>
        ))
    }


    render() {
        return (
            <main>
                <div className="row-full"> Clientes</div>

                <Container>
                <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797", }} onClick={() => this.onClickNuevaPersona()}>Agregar Persona</Button>
                    <Table tableHeading={this.state.cabeceras} body={this.body()} />
                    <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarPersona={this.onClickProcesarPersona} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>
                </Container>
            </main>
        );
    }
}
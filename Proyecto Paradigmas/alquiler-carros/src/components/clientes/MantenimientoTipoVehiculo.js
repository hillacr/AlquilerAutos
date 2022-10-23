import React, { Component, useEffect, useState } from 'react';
import { Container, Form, Row, Col, Label, Input, Button, FormGroup } from 'reactstrap';
import Swal from 'sweetalert2'
import 'jquery/dist/jquery.min.js';
import { Alert } from 'react-bootstrap'
import { Table } from '../Table';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//modal
import { FormularioModal } from '../components_forms/ventanaModal';
import Formulario from '../mantenimientos_forms/formTipoVehiculo';
import TipoVehiculoService from "../../services/TipoVehiculoService";


export class MantenimientoTipoVehiculo extends Component {
    static displayName = MantenimientoTipoVehiculo.name;

    constructor(props) {
        super(props);
        this.state = {
            listaTiposVehiculo: [],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar TipoVehiculo",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: ["ID", "Tipo de Vehículo","Acciones"],
        };

    }
    async ObtenerListadoTiposVehiculo() {
        TipoVehiculoService.getAll()
        .then((response) => {
          this.setState({ listaTiposVehiculo: response.data });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      }

    async componentDidMount() {
        await this.ObtenerListadoTiposVehiculo();

        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }



    onClickNuevoTipoVehiculo = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar TipoVehiculo" });
    }

    onClickActualizarTipoVehiculo = async (id) => {
        this.setState({ proceso: 2 });//proceso 2 actualizar
        await TipoVehiculoService.get(id)
        .then((response) => {
          this.setState({ data: response.data });
          console.log(response.data);//
        })
        .catch((e) => {
          console.log(e);
        });
      
      this.setState({ modal: !this.state.modal });
      this.setState({ labelButton: "Actualizar" });
      this.setState({ modalTitulo: "Actualizar Tipo Vehiculo" });
    }

    onClickProcesarTipoVehiculo = async (TipoVehiculo) => {
        console.log(TipoVehiculo);
        $.fn.dataTable.ext.errMode = 'none';
          let respuesta = {};
    
          if (this.state.proceso === 1){
              TipoVehiculoService.create(TipoVehiculo)
              .then((response)=>{
                this.setState({ modal: false });
                this.ObtenerListadoTiposVehiculo();
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
              TipoVehiculoService.update(TipoVehiculo.id, JSON.stringify(TipoVehiculo))
              .then((response) => {
                
                this.setState({ modal: false });
                this.ObtenerListadoTiposVehiculo();
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
      onClickEliminarTipoVehiculo = async (id)=>{
        $.fn.dataTable.ext.errMode = 'none';
        console.log(id);
        TipoVehiculoService.remove(parseInt(id))
          .then((response) => {
            this.setState({ modal: false });
            this.ObtenerListadoTiposVehiculo();
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
                text: 'El tipo de vehiculo que intenta eliminar está asociado a un vehículo',
              })
          });
      }  
    onClickCerrarModal = () => {
        this.setState({ modal: false });
        this.setState({ mensajeFormulario: "" });
    }


    body = () => {
        return this.state.listaTiposVehiculo.map((item, index) => (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.descripcion}</td>

                {/*COLUMNAS DE ESTADO Y BOTONES CON ESTILO */}
                <td style={{ display: "flex", padding: "0.5vw" }}>

                    <Button color="primary" onClick={() => this.onClickActualizarTipoVehiculo(item.id)} style={{ marginRight: "1vw" }}>Editar
                    </Button>
                    <Button color={"danger" } onClick={() => this.onClickEliminarTipoVehiculo(item.id)}> Eliminar
                    </Button>
                </td>
            </tr>
        ))
    }


    render() {
        return (
            <main>
                <div className="row-full">Catálogo de TiposVehiculo </div>
                <Container>
                    <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797" }} onClick={() => this.onClickNuevoTipoVehiculo()}>Insertar TipoVehiculo</Button>
                    <hr />
                    <br />

                    {/*ALERTA*/}

                    {this.state.show ?
                        <Alert variant={this.state.alerta === true ? "success" : "danger"} onClose={() => this.setState({ show: false })} dismissible>
                            {this.state.mensajeRespuesta.mensaje}
                        </Alert>
                        : ""}

                    <br />

                    <Table tableHeading={this.state.cabeceras} body={this.body()} />

                    <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarTipoVehiculo={this.onClickProcesarTipoVehiculo} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>

                </Container>
            </main>
        );
    }
}
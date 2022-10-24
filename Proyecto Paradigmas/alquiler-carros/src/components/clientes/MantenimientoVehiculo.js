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
import Formulario from '../mantenimientos_forms/formVehiculo';
import VehiculoService from "../../services/VehiculoService";

export class MantenimientoVehiculo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaVehiculos: [
              ],
            pendiente: false,
            data: {},
            modal: false,
            proceso: 1,
            modalTitulo: "Registrar Vehiculo",
            labelButton: "Registrar",
            mensajeFormulario: "",
            mensajeRespuesta: {},
            show: false,
            alerta: true,
            cabeceras: ["Id", "Placa", "Tipo de Vehículo", "Acción"],
        };

    }
    async ObtenerListadoVehiculos() {
        VehiculoService.getAll()
        .then((response) => {
          this.setState({ listaVehiculos: response.data });
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      }
    onClickNuevaVehiculo = async () => {
        this.setState({ proceso: 1 });
        this.setState({ modal: !this.state.modal });
        this.setState({ labelButton: "Registrar" });
        this.setState({ modalTitulo: "Registrar Vehiculo" });
    }

    onClickActualizarVehiculo = async (id) => {
        this.setState({ proceso: 2 });//proceso 2 actualizar
        await VehiculoService.get(id)
        .then((response) => {
          this.setState({ data: response.data });
          console.log(response.data);//
        })
        .catch((e) => {
          console.log(e);
        });
      this.setState({ proceso: 2 });
      this.setState({ modal: !this.state.modal });
      this.setState({ labelButton: "Actualizar" });
      this.setState({ modalTitulo: "Actualizar Vehiculo" });
    }

    onClickCerrarModal = () => {
      this.setState({ modal: false });
      this.setState({ mensajeFormulario: "" });
    }
    async componentDidMount() {
        this.ObtenerListadoVehiculos();
        console.log(this.state.listaVehiculos);
        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
    }

    onClickCerrarModal = () => {
      this.setState({ modal: false });
      this.setState({ mensajeFormulario: "" });
    }

    async componentDidMount() {

        await this.ObtenerListadoVehiculos();

        setTimeout(() => {

            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);

    }

    onClickProcesarVehiculo = async (Vehiculo) => {
    $.fn.dataTable.ext.errMode = 'none';
      let respuesta = {};

      if (this.state.proceso === 1){
          VehiculoService.create(Vehiculo)
          .then((response)=>{
            this.setState({ mensajeFormulario: respuesta.mensaje });
            this.setState({ modal: false });
            this.ObtenerListadoVehiculos();
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
        console.log(Vehiculo);
          VehiculoService.update(Vehiculo.id, JSON.stringify(Vehiculo))

          .then((response) => {
            this.setState({ mensajeFormulario: respuesta.mensaje });
            
            this.setState({ modal: false });
            this.ObtenerListadoVehiculos();
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
  onClickEliminarVehiculo = async (id)=>{
    $.fn.dataTable.ext.errMode = 'none';
    console.log(id);
    VehiculoService.remove(parseInt(id))
      .then((response) => {
        this.setState({ modal: false });
        this.ObtenerListadoVehiculos();
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
          text: 'El vehiculo que intenta eliminar está alquilado',
        })
      });
  }

    body = () => {
        return this.state.listaVehiculos.map((item, index) => (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.placa}</td>
                <td>{item.tipo_vehiculo.descripcion}</td>
                <td><Button color="primary" onClick={() => this.onClickActualizarVehiculo(item.id)} style={{ marginRight: "1vw" }}>Editar
                    </Button>
                    <Button color={"danger" } onClick={() => this.onClickEliminarVehiculo(item.id)}> Eliminar
                    </Button>
                </td>

            </tr>
        ))
    }


    render() {
        return (
            <main>
                <div className="row-full">Vehículos</div>

                <Container>
                <Button style={{ backgroundColor: "#17A797", borderColor: "#17A797", }} onClick={() => this.onClickNuevaVehiculo()}>Agregar Vehiculo</Button>
                    <Table tableHeading={this.state.cabeceras} body={this.body()} />
                    <FormularioModal show={this.state.modal} handleClose={this.onClickCerrarModal} titulo={this.state.modalTitulo} className=''>
                        <Formulario labelButton={this.state.labelButton} data={this.state.data} proceso={this.state.proceso} onClickProcesarVehiculo={this.onClickProcesarVehiculo} mensaje={this.state.mensajeFormulario} />
                    </FormularioModal>
                </Container>
            </main>
        );
    }
}
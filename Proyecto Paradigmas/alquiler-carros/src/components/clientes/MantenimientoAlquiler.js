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
import AlquilerDataService from "../../services/AlquilerService";

export class MantenimientoAlquiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaAlquileres: [],
      pendiente: false,
      data: {},
      modal: false,
      proceso: 1,
      modalTitulo: "Registrar Alquiler",
      labelButton: "Registrar",
      mensajeFormulario: "",
      mensajeRespuesta: {},
      show: false,
      alerta: true,
      cabeceras: [
        "Id",
        "Fecha",
        "Cedula",
        "Cliente",
        "Placa",
        "Tipo Vehiculo",
        "Acción"
      ],
    
    };
  }

  async ObtenerListadoAlquileres() {
    AlquilerDataService.getAll()
      .then((response) => {
        this.setState({ listaAlquileres: response.data });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onClickNuevaAlquiler = async () => {
    this.setState({ proceso: 1 });
    this.setState({ modal: !this.state.modal });
    this.setState({ labelButton: "Registrar" });
    this.setState({ modalTitulo: "Registrar Alquiler" });
  };

  onClickActualizarAlquiler = async (id) => {
    this.setState({ proceso: 2 });
    this.setState({ modal: !this.state.modal });
    this.setState({ labelButton: "Actualizar" });
    this.setState({ modalTitulo: "Actualizar Alquiler" });
  };

  async componentDidMount() {
    await this.ObtenerListadoAlquileres();
    setTimeout(() => {
      $("#example").DataTable({
        lengthMenu: [
          [5, 10, 15, -1],
          [5, 10, 15, "All"],
        ],
      });
    }, 100);
  }
  onClickProcesarAlquiler = async (data) => {
    let respuesta = {};

    /*if (this.state.proceso === 1)
          respuesta = await AgregarSocio(data);
      else {

          respuesta = await ActualizarSocio(data);
      }*/

    if (respuesta.indicador == 0) {
      this.setState({ modal: false });
      this.setState({ mensajeRespuesta: respuesta }); //Un objeto con el .indicador y el .mensaje
      this.setState({ alerta: true });

      $("#example").DataTable().destroy();

      setTimeout(() => {
        $("#example").DataTable({
          lengthMenu: [
            [5, 10, 15, -1],
            [5, 10, 15, "All"],
          ],
        });
      }, 100);
    } else {
      this.setState({ mensajeFormulario: respuesta.mensaje });
      this.setState({ alerta: false });
    }

    this.setState({ show: true });
  };
  onClickCancelarAlquiler = async (id)=>{
    $.fn.dataTable.ext.errMode = 'none';
    Swal.fire({
      title: '¿Desea cancelar el alquiler?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        AlquilerDataService.remove(parseInt(id))
      .then((response) => {
        this.setState({ modal: false });
        
        this.ObtenerListadoAlquileres();
        setTimeout(() => {
            $('#example').DataTable(
                {
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                });
        }, 100);
      })
        Swal.fire(
          'Cancelado!',
          '',
          'success'
        )
      }
    }) 
    console.log(id);
    
  }

  body = () => {
    return this.state.listaAlquileres.map((item, index) => (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.fecha.substr(0, item.fecha.indexOf("T"))}</td>
        <td>{item.persona.identificacion}</td>
        <td>{item.persona.nombre}</td>
        <td>{item.vehiculo.placa}</td>
        <td>{item.vehiculo.tipo_vehiculo.descripcion}</td>
        <td><Button color={"danger" } onClick={() => this.onClickCancelarAlquiler(item.id)}> Cancelar Alquiler
                    </Button></td>
      </tr>
    ));
  };

  render() {
    return (
      <main>
        <div className="row-full">Lista Alquileres</div>

        <Container>
          <Table tableHeading={this.state.cabeceras} body={this.body()} />

        </Container>
      </main>
    );
  }
}
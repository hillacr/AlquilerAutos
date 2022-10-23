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
import LogService from "../../services/LogService";

export class Logs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaLogs: [],
      cabeceras: [
        "Id",
        "Clase",
        "Descripción",
        "Fecha"
      ],
    
    };
  }

  async ObtenerLogs() {
    LogService.getAll()
      .then((response) => {
        this.setState({ listaLogs: response.data });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }


  async componentDidMount() {
    await this.ObtenerLogs();
    setTimeout(() => {
      $("#example").DataTable({
        lengthMenu: [
          [5, 10, 15, -1],
          [5, 10, 15, "All"],
        ],
      });
    }, 100);
  }
 

  body = () => {
    return this.state.listaLogs.map((item, index) => (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.clase}</td>
        <td>{item.descripcion}</td>
        <td>{item.fecha.substr(0, item.fecha.indexOf("T"))}</td>
      </tr>
    ));
  };

  render() {
    return (
      <main>
        <div className="row-full">Logs</div>

        <Container>
          <Table tableHeading={this.state.cabeceras} body={this.body()} />

        </Container>
      </main>
    );
  }
}
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect} from '../components_forms/inputs'
import AlquilerService from '../../services/AlquilerService'
import PersonaService from '../../services/PersonaService'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Formulario = ({ labelButton, data, onClickProcesarAlquiler, mensaje }) => {
    //variables

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [listaClientes, setListaClientes] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);

    useEffect(() => {
      ObtenerlistaClientes();


    }, []);
    
    const ObtenerlistaClientes = async () => {

      PersonaService.getAll()
      .then((response) => {
        const sect = response.data;
        let defecto = { id: '', nombre: " --- Seleccione una persona  --- " };
        sect.push(defecto);
        setListaClientes(sect.reverse());
      })
      .catch((e) => {
        console.log(e);
      });
    };

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const Alquiler = {
                idPersona: parseInt(id),
                idVehiculo: parseInt(data.id),
            };
            onClickProcesarAlquiler(Alquiler);
        }
        setValidated(true);
        event.preventDefault();
    }





    const onChangeId = (e) => setId(e.target.value);

    const onChangeNombre = (e) => setNombre(e.target.value);
    return (
      <>
        <Form noValidate validated={validated} onSubmit={onClickAceptar}>
          <Form.Label>Tipo Vehiculo</Form.Label>
          <Form.Control placeholder={data.tipo_vehiculo.descripcion} disabled />

          <Form.Label>Placa Vehiculo</Form.Label>
          <Form.Control placeholder={data.placa} disabled />

          <InputSelect
            className="slct_lineas"
            controlId="slct_lineas"
            label="Cliente"
            data={listaClientes}
            value={id}
            onChange={onChangeId}
            optionValue="id"
            optionLabel="nombre"
            classGroup="form-lineas"
          ></InputSelect>

          {mensaje !== "" ? (
            <p className="text-info text-center">{mensaje}</p>
          ) : (
            ""
          )}
          <div className="text-right">
            <Button variant="primary" type="submit" size="sm">
              {labelButton}
            </Button>
          </div>
        </Form>
      </>
    );
}

export default Formulario
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText, InputSelect} from '../components_forms/inputs'
import TipoVehiculoService from "../../services/TipoVehiculoService";
const Formulario = ({ labelButton, data, proceso, onClickProcesarVehiculo, mensaje }) => {

    //variables

    const [placa, setPlaca] = useState(proceso == 2 ? data.placa : '');
    const [tipoVehiculo, setTipoVehiculo] = useState(proceso == 2 ? data.tipo_vehiculo.id : "--- Seleccione un tipo de vehiculo  ---");
    const [listaTiposVehiculo, setListaTiposVehiculo] = useState([]);
    //validación
    const [validated, setValidated] = useState(false);

    const ObtenerListaTiposVehiculo = async () => {

        await TipoVehiculoService.getAll()
        .then((response) => {
            
        if (proceso === 2) {
            const sect = response.data;
            setListaTiposVehiculo(sect.sort((x, y) => { return x.id === tipoVehiculo ? -1 : y.id === tipoVehiculo ? 1 : 0; }));//Ordena el array colocando de primero el tipo de persona del actual socio
        }
        else {
            const sect = response.data;
            let defecto = { id: '', decripcion: " --- Seleccione un tipo de vehiculo  --- "};//Pone el valor por defecto en seleccionar el tipo de persona
            sect.push(defecto);
            console.log(sect);
            setListaTiposVehiculo(sect.reverse());
        }
        
        })
        .catch((e) => {
          console.log(e);
        });

        

    }
    useEffect(() => {

        ObtenerListaTiposVehiculo();
        console.log(tipoVehiculo);
    }, []);

    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos  
            const Vehiculo = {
                placa: placa,
                idTipo_Vehiculo:tipoVehiculo,
            };

            if (proceso === 2) { Vehiculo.id = parseInt(data.id); };
            const result = onClickProcesarVehiculo(Vehiculo); //se ejecuta la función

        }
        setValidated(true);
        event.preventDefault();
    }




    useEffect(() => {

        ObtenerListaTiposVehiculo();
    }, []);
    
    const onChangeTipoVehiculo = (e) => {
        setTipoVehiculo(e.target.value);
        console.log(e.target.value);
    };

    const onChangePlaca = (e) => setPlaca(e.target.value);
    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                <InputText id='txt-nombre' label='La placa del vehiculo:' type='text' placeholder='Ingrese el nombre del vehiculo' value={placa}
                    onChange={onChangePlaca} mensajeValidacion="El nombre de la vehiculo es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}


                <InputSelect className="slct_lineas" controlId="slct_lineas" label="Tipo de Vehiculo" data={listaTiposVehiculo} value={tipoVehiculo} onChange={onChangeTipoVehiculo} optionValue="id" optionLabel="descripcion"
                    classGroup="form-lineas"></InputSelect>

                <div className='text-right'>
                    <Button variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>
        </>
    )
}

export default Formulario
import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText } from '../components_forms/inputs'

const Formulario = ({ labelButton, data, proceso, onClickProcesarTipoVehiculo, mensaje }) => {

    //variables

    const [descripcion, setDescripcion] = useState(proceso == 2 ? data.descripcion : '');

    //validación
    const [validated, setValidated] = useState(false);





    const onClickAceptar = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos
            const TipoVehiculo = {
                
                descripcion: descripcion,

            };
            if (proceso === 2) { TipoVehiculo.id = parseInt(data.id); };
            const result = onClickProcesarTipoVehiculo(TipoVehiculo); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
    }





    const onChangeDescripcion = (e) => setDescripcion(e.target.value);
    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                <InputText id='txt-nombre' label='Tipo de Vehiculo:' type='text' placeholder='Ingrese el tipo de vehiculo' value={descripcion}
                    onChange={onChangeDescripcion} mensajeValidacion="El tipo de vehiculo es requerido"/>

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}




                <div className='text-right'>
                    <Button variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>
        </>
    )
}

export default Formulario




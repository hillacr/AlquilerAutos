import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { InputText} from '../components_forms/inputs'

const Formulario = ({labelButton, data, proceso, onClickProcesarPersona, mensaje }) => {

    //variables

    const [identific, setIdentificacion] = useState(proceso == 2 ? data.identificacion : '');
    const [nombr, setNombre] = useState(proceso == 2 ? data.nombre : '');
    //validación
    const [validated, setValidated] = useState(false);

    const initialPersonaState = {
        id: null,
        identificacion: "",
        nombre: "",
    };

    const [currentPersona, setCurrentPersona] = useState(initialPersonaState);  

    const [message, setMessage] = useState("");


    const onClickAceptar = async (event) => {

        const Persona = {
            id: data.id,
            identificacion: identific,
            nombre: nombr,
        };

        const form = event.currentTarget;

        if (form.checkValidity() === false) { //valida el form
            event.preventDefault();
            event.stopPropagation();
        } else { //si está correcto arma la variable datos

        onClickProcesarPersona(Persona); //se ejecuta la función
        }
        setValidated(true);
        event.preventDefault();
        event.stopPropagation();
    }





    const onChangeIdentificacion = (e) => {
        setIdentificacion(e.target.value);
    }

    const onChangeNombre = (e) =>{
        setNombre(e.target.value);
    } 
    return (
        <>
            <Form noValidate validated={validated} onSubmit={onClickAceptar}>

                <InputText id='txt-nombre' label='Nombre de la persona:' type='text' placeholder='Ingrese el nombre del persona' value={nombr}
                    onChange={onChangeNombre} mensajeValidacion="El nombre de la persona es requerido" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

                <InputText id='txt-identificacion' label='Cédula de la persona:' type='text' placeholder='Ingrese la cédula de la persona' value={identific}
                    onChange={onChangeIdentificacion} mensajeValidacion="La cédula del persona es requerida" />

                {mensaje !== "" ? <p className="text-info text-center">{mensaje}</p> : ""}

                <div className='text-right'>
                    <Button variant="primary" type="submit" size="sm">{labelButton}</Button>
                </div>
            </Form>
        </>
    )
}

export default Formulario
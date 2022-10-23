package com.alquiler.alquiler.Entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Alquiler implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Para que haga a la PK solo como en SQL
    private Long Id;

    //relacion de una a uno con la tabla persona
    @OneToOne
    @JoinColumn(name = "id_Persona", referencedColumnName = "id")
    private Persona persona;

    //relacion de una a uno con la tabla vehiculo
    @OneToOne
    @JoinColumn(name = "id_vehiculo", referencedColumnName = "id")
    private Vehiculo vehiculo;

    private Date Fecha;

    public Alquiler() {
        this.Fecha = new Date();
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

    public Date getFecha() {
        return Fecha;
    }

    public void setFecha(Date fecha) {
        Fecha = fecha;
    }
}

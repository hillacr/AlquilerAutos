package com.alquiler.alquiler.Entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Vehiculo implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Para que haga a la PK solo como en SQL
    private Long Id;
    private String placa;

    @OneToOne
    @JoinColumn(name = "id_tipo_vehiculo", referencedColumnName = "id")
    private Tipo_Vehiculo tipo_vehiculo;

    public Vehiculo() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public Tipo_Vehiculo getTipo_vehiculo() {
        return tipo_vehiculo;
    }

    public void setTipo_vehiculo(Tipo_Vehiculo tipo_vehiculo) {
        this.tipo_vehiculo = tipo_vehiculo;
    }

}

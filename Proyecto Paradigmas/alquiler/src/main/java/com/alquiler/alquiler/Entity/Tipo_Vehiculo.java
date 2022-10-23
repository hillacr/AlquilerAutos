package com.alquiler.alquiler.Entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Tipo_Vehiculo implements Serializable{

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY) //Para que haga a la PK solo como en SQL
        private Long id;
        private String descripcion;

        public Tipo_Vehiculo() {
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getdescripcion() {
            return descripcion;
        }

        public void setdescripcion(String descripcion) {
            this.descripcion = descripcion;
        }
}

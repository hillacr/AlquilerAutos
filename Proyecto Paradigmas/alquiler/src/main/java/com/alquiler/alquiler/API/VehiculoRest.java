package com.alquiler.alquiler.API;

import com.alquiler.alquiler.Entity.Alquiler;
import com.alquiler.alquiler.Entity.Vehiculo;
import com.alquiler.alquiler.Repository.Tipo_VehiculoRepository;
import com.alquiler.alquiler.Entity.Tipo_Vehiculo;
import com.alquiler.alquiler.Repository.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="/vehiculos")

public class VehiculoRest {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private Tipo_VehiculoRepository tipo_vehiculoRepository;



    @GetMapping
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<List<Vehiculo>> findAll() {
        List<Vehiculo> list = new ArrayList<Vehiculo>();
        vehiculoRepository.findAll().forEach(e -> list.add(e));
        return ResponseEntity.ok(list);
    }

    @PostMapping
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity create (@RequestBody VehiculoMasTipo vehimatipo) {
        Vehiculo vehiculo = new Vehiculo();
        vehiculo.setPlaca(vehimatipo.getPlaca());
        Tipo_Vehiculo tv = tipo_vehiculoRepository.findById(vehimatipo.getIdTipo_Vehiculo()).get();
        vehiculo.setTipo_vehiculo(tv);
        return ResponseEntity.ok(vehiculoRepository.save(vehiculo));
    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<Vehiculo> update(@PathVariable("id") Long id, @RequestBody VehiculoMasTipo vehimatipo) {
        if (!vehiculoRepository.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            Vehiculo vehi = new Vehiculo();
            vehi.setId(id);
            vehi.setPlaca(vehimatipo.getPlaca());
            vehi.setTipo_vehiculo(tipo_vehiculoRepository.findById(vehimatipo.getIdTipo_Vehiculo()).get());
            return ResponseEntity.ok(vehiculoRepository.save(vehi));
        }
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<Vehiculo> delete(@PathVariable("id") long id) {
        if (!vehiculoRepository.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        vehiculoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/{id}")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<Vehiculo> findById(@PathVariable("id") long id) {
            Optional<Vehiculo> vehiculo = vehiculoRepository.findById(id);
        if (!vehiculo.isPresent()) {
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(vehiculo.get());
    }

}

class VehiculoMasTipo {
    public String placa;

    public Long idTipo_Vehiculo;

    public VehiculoMasTipo() {
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public Long getIdTipo_Vehiculo() {
        return idTipo_Vehiculo;
    }

    public void setIdTipo_Vehiculo(Long idTipo_Vehiculo) {
        this.idTipo_Vehiculo = idTipo_Vehiculo;
    }
}

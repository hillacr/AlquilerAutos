package com.alquiler.alquiler.API;

import com.alquiler.alquiler.Entity.Tipo_Vehiculo;
import com.alquiler.alquiler.Repository.PersonaRepository;
import com.alquiler.alquiler.Repository.Tipo_VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="/tipovehiculos")
public class Tipo_VehiculoRest {

    @Autowired
    private Tipo_VehiculoRepository tipo_vehiculoRepository;

    @GetMapping
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<List<Tipo_Vehiculo>> findAll() {
        List<Tipo_Vehiculo> list = new ArrayList<Tipo_Vehiculo>();
        tipo_vehiculoRepository.findAll().forEach(e -> list.add(e));
        return ResponseEntity.ok(list);
    }

    @PostMapping
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity create(@RequestBody Tipo_Vehiculo tipo_vehiculo) {
        return ResponseEntity.ok(tipo_vehiculoRepository.save(tipo_vehiculo));
    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<Tipo_Vehiculo> update(@PathVariable("id") Long id, @RequestBody Tipo_Vehiculo tipo_vehiculo) {
        if (!tipo_vehiculoRepository.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            tipo_vehiculo.setId(id);
            return ResponseEntity.ok(tipo_vehiculoRepository.save(tipo_vehiculo));
        }
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<Tipo_Vehiculo> delete(@PathVariable("id") long id) {
        if (!tipo_vehiculoRepository.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        tipo_vehiculoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<Tipo_Vehiculo> findById(@PathVariable("id") long id) {
        Optional<Tipo_Vehiculo> tipo_vehiculo = tipo_vehiculoRepository.findById(id);
        if (!tipo_vehiculo.isPresent()) {
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(tipo_vehiculo.get());
    }

}

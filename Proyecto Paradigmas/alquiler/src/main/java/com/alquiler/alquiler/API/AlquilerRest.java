package com.alquiler.alquiler.API;

import com.alquiler.alquiler.Entity.Alquiler;
import com.alquiler.alquiler.Entity.Persona;
import com.alquiler.alquiler.Entity.Tipo_Vehiculo;
import com.alquiler.alquiler.Entity.Vehiculo;
import com.alquiler.alquiler.Repository.AlquilerRepository;
import com.alquiler.alquiler.Repository.PersonaRepository;
import com.alquiler.alquiler.Repository.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path="/alquilar")

public class AlquilerRest {

    @Autowired
    AlquilerRepository alquilerRepository;

    @Autowired
    VehiculoRepository vehiculoRepository;

    @Autowired
    PersonaRepository personaRepository;

    @GetMapping
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<List<Alquiler>> findAll() {
        List<Alquiler> list = new ArrayList<Alquiler>();
        alquilerRepository.findAll().forEach(e -> list.add(e));
        return ResponseEntity.ok(list);
    }
    @PostMapping
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity create (@RequestBody alquilado alqui) {
        List<Alquiler> list = new ArrayList<Alquiler>();
        alquilerRepository.findAll().forEach(e -> list.add(e));
        Date fechaactual = new Date();

        SimpleDateFormat dmyFormat = new SimpleDateFormat("yyyy-MM-dd");
        String formattedDateStr = dmyFormat.format(fechaactual);

        String FechaComparada;

        for (Alquiler alquiler : list) {
            FechaComparada = String.valueOf(alquiler.getFecha());
            FechaComparada = FechaComparada.substring(0, 10);
            if (alquiler.getVehiculo().getId() == alqui.getIdVehiculo()) {
                return ResponseEntity.badRequest().build();
            }if(alquiler.getPersona().getId() == alqui.getIdPersona() && FechaComparada.equals(formattedDateStr)){
                return ResponseEntity.badRequest().build();
            }
        }
        Alquiler alquiler = new Alquiler();
        Vehiculo v = vehiculoRepository.findById(alqui.getIdVehiculo()).get();
        alquiler.setVehiculo(v);
        Persona p = personaRepository.findById(alqui.getIdPersona()).get();
        alquiler.setPersona(p);
        return ResponseEntity.ok(alquilerRepository.save(alquiler));
    }
    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<Alquiler> delete(@PathVariable("id") long id) {
        if (!alquilerRepository.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        alquilerRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{id}")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<Alquiler> update(@PathVariable("id") Long id, @RequestBody alquilado alqui) {
        if (!alquilerRepository.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            Alquiler alquiler = new Alquiler();
            alquiler.setId(id);
            alquiler.setVehiculo(vehiculoRepository.findById(alqui.getIdVehiculo()).get());
            alquiler.setPersona(personaRepository.findById(alqui.getIdPersona()).get());
            return ResponseEntity.ok(alquilerRepository.save(alquiler));
        }
    }
}
class alquilado{
    public Long idVehiculo;
    public Long idPersona;

    public alquilado() {
    }

    public Long getIdVehiculo() {
        return idVehiculo;
    }

    public void setIdVehiculo(Long idVehiculo) {
        this.idVehiculo = idVehiculo;
    }

    public Long getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(Long idPersona) {
        this.idPersona = idPersona;
    }
}

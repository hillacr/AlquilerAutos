package com.alquiler.alquiler.API;

import com.alquiler.alquiler.Entity.Persona;
import com.alquiler.alquiler.Repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="/personas")
public class PersonaRest {

    @Autowired
    private PersonaRepository personaRepository;

    @GetMapping
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<List<Persona>> findAll() {
        List<Persona> list = new ArrayList<Persona>();
        personaRepository.findAll().forEach(e -> list.add(e));
        return ResponseEntity.ok(list);
    }

    @PostMapping
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity create(@RequestBody Persona persona) {
        return ResponseEntity.ok(personaRepository.save(persona));
    }

    @PutMapping("/{id}")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<Persona> update(@PathVariable("id") Long id, @RequestBody Persona persona) {
        if (!personaRepository.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            persona.setId(id);
            return ResponseEntity.ok(personaRepository.save(persona));
        }
    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<Persona> delete(@PathVariable("id") long id) {
        if (!personaRepository.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        personaRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "*", maxAge = 3600)
    public ResponseEntity<Persona> findById(@PathVariable("id") long id) {
        Optional<Persona> persona = personaRepository.findById(id);
        if (!persona.isPresent()) {
            ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(persona.get());
    }

}

package com.alquiler.alquiler.Repository;

import com.alquiler.alquiler.Entity.Vehiculo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiculoRepository extends CrudRepository<Vehiculo, Long> {

}

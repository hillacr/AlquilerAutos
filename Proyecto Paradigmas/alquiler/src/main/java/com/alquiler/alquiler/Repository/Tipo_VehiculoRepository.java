package com.alquiler.alquiler.Repository;

import com.alquiler.alquiler.Entity.Tipo_Vehiculo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Tipo_VehiculoRepository extends CrudRepository<Tipo_Vehiculo, Long> {

}

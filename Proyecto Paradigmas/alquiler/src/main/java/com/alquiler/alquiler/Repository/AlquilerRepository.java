package com.alquiler.alquiler.Repository;

import com.alquiler.alquiler.Entity.Alquiler;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlquilerRepository extends CrudRepository<Alquiler, Long> {

}

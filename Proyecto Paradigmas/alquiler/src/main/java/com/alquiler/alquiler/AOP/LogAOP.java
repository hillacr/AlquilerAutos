package com.alquiler.alquiler.AOP;

import com.alquiler.alquiler.Repository.LogRepository;
import com.alquiler.alquiler.Entity.Log;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

@Aspect
@Component
public class LogAOP {

    @Autowired
    LogRepository logRepository;

    @Before("execution(* com.alquiler.alquiler.Repository.PersonaRepository.save(..))")
    public void logBeforeSavePersona(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Persona");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.Tipo_VehiculoRepository.save(..))")
    public void logBeforeSaveTipo_Vehiculo(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Tipo_Vehiculo");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.AlquilerRepository.save(..))")
    public void logBeforeSaveAlquiler(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Alquiler");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.VehiculoRepository.save(..))")
    public void logBeforeSaveVehiculo(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Vehiculo");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.PersonaRepository.delete(..))")
    public void logBeforeDeletePersona(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Persona");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.Tipo_VehiculoRepository.delete(..))")
    public void logBeforeDeleteTipo_Vehiculo(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Tipo_Vehiculo");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.AlquilerRepository.delete(..))")
    public void logBeforeDeleteAlquiler(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Alquiler");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.VehiculoRepository.delete(..))")
    public void logBeforeDeleteVehiculo(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Vehiculo");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.PersonaRepository.findAll(..))")
    public void logBeforeFindAllPersona(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Persona");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.Tipo_VehiculoRepository.findAll(..))")
    public void logBeforeFindAllTipo_Vehiculo(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Tipo_Vehiculo");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.AlquilerRepository.findAll(..))")
    public void logBeforeFindAllAlquiler(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Alquiler");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.VehiculoRepository.findAll(..))")
    public void logBeforeFindAllVehiculo(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Vehiculo");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.PersonaRepository.findById(..))")
    public void logBeforeFindByIdPersona(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Persona");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.Tipo_VehiculoRepository.findById(..))")
    public void logBeforeFindByIdTipo_Vehiculo(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Tipo_Vehiculo");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.AlquilerRepository.findById(..))")
    public void logBeforeFindByIdAlquiler(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Alquiler");
        logRepository.save(log);
    }
    @Before("execution(* com.alquiler.alquiler.Repository.VehiculoRepository.findById(..))")
    public void logBeforeFindByIdVehiculo(JoinPoint joinPoint) {
        Log log = new Log();
        log.setFecha(new Date());
        log.setdescripcion(joinPoint.getSignature().getName());
        log.setClase("Vehiculo");
        logRepository.save(log);
    }

}

package com.example.employeeManager.service;

import com.example.employeeManager.exception.UserNotFoundException;
import com.example.employeeManager.model.Employee;
import com.example.employeeManager.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepo employeeRepo;
    @Autowired
    public EmployeeService(EmployeeRepo employeeRepo){
        this.employeeRepo = employeeRepo;
    }

    public Employee addEmployee(Employee employee){
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepo.save(employee);
    }

    public List<Employee> findAllEmployees(){
        return employeeRepo.findAll();
    }

    public Employee updateEmployee(Employee employee){
        return employeeRepo.save(employee);
    }

    public Employee findEmployeeById(Long id){
        return employeeRepo.findById(id).orElseThrow(()-> new UserNotFoundException("User by id " + id + " was not found."));
    }

    public void deleteEmployee(Long id){
        employeeRepo.deleteById(id);
    }

}

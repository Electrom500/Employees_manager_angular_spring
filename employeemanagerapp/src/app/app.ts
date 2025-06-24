import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet, CommonModule],
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  public employees: Employee[] = [];

  constructor(private employeeService:EmployeeService) { }
  
  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[])=> {
        this.employees = response;
      },
      (error:HttpErrorResponse) =>{
        alert(error.message);
      }
    )
  }
}

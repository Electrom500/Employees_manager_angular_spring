import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports: [RouterOutlet, CommonModule],
  imports: [CommonModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  public employees: Employee[] = [];
  public editEmployee: Employee = {} as Employee;
  public deleteEmployee: Employee | null = null;

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
  
  public onOpenModal(employee: Employee | null, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');

  if (mode === 'add') {
    button.setAttribute('data-target', '#addEmployeeModal');
  }
  if (mode === 'edit' && employee) {
    this.editEmployee = { ...employee };
    button.setAttribute('data-target', '#editEmployeeModal');
  }
  if (mode === 'delete' && employee) {
    this.deleteEmployee = employee;
    button.setAttribute('data-target', '#deleteEmployeeModal');
  }

  container?.appendChild(button);
  button.click();
}

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );  
  }

  public onUpdateEmployee(form: NgForm): void {
  this.employeeService.updateEmployee(this.editEmployee).subscribe(
    (response: Employee) => {
      console.log('Employee updated', response);
      this.getEmployees();
      form.resetForm();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

public onDeleteEmployee(employeeId: number | undefined): void {
  if (!employeeId) return;
  this.employeeService.deleteEmployee(employeeId).subscribe(
    () => {
      console.log('Employee deleted');
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

}

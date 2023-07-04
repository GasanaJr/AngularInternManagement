import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employeeModal';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeeModelobj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formBuilder: FormBuilder, private api:ApiService) {}

  ngOnInit(): void {
     this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
     }) 
     this.getAllEmployee()
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelobj.firstName = this.formValue.value.firstName;
    this.employeeModelobj.lastName = this.formValue.value.lastName;
    this.employeeModelobj.email = this.formValue.value.email;
    this.employeeModelobj.mobile = this.formValue.value.mobile;
    this.employeeModelobj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelobj)
    .subscribe(res => {
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset()
      this.getAllEmployee()
    },
    err => {
      alert("Something went wrong");
      console.log(err)
    })
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    } )
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
    .subscribe(res => {
      alert("Employee Deleted")
      this.getAllEmployee()
    })
  }

  onEdit(row:any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelobj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails() {
    this.employeeModelobj.firstName = this.formValue.value.firstName;
    this.employeeModelobj.lastName = this.formValue.value.lastName;
    this.employeeModelobj.email = this.formValue.value.email;
    this.employeeModelobj.mobile = this.formValue.value.mobile;
    this.employeeModelobj.salary = this.formValue.value.salary;
    this.api.updateEmployee(this.employeeModelobj, this.employeeModelobj.id)
    .subscribe(res => {
      alert("Employee Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset()
      this.getAllEmployee()
    })
  }

}

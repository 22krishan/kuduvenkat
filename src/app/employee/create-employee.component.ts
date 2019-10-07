import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.employeeForm= new FormGroup({
      fullName: new FormControl(),
      email: new FormControl(),
      skills: new FormGroup({
        skillName: new FormControl(),
        experienceInYears: new FormControl(),
        proficiency: new FormControl()
      })
    })
  }

  onSubmit():void {
    console.log(this.employeeForm.value);
  }

  loadData():void {

    // setValue -> have to give all the formControls
    // patchValue --> can be used to update the subset of formControls
    this.employeeForm.setValue({
      fullName:'krishan',
      email:'22krishan@gmail.com',
      skills:{
        skillName:'React',
        experienceInYears:5,
        proficiency:'intermediate'
      }
    })
  }

}

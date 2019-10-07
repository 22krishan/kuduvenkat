import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.employeeForm= this.fb.group({
      fullName: ['',[ Validators.required,Validators.maxLength(15),Validators.minLength(3)] ],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['']
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

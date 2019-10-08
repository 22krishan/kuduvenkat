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
    
    //valueChanges Observable changes from abstract class
    this.employeeForm.get('fullName').valueChanges.subscribe((
      value => {
          //can be used to implement autocomplete feature 
          //dynamically validating formControls and Form Logic
          // calling api
          console.log(value)
      }
    ))
  }

  
/*   
   Controls can be marked as prestine, diry, disabled etc etc 
   use abstractControl. to enlist all different properties 
*/
  logkeyValuePair(group: FormGroup):void {
    Object.keys(group).forEach((key)=>{
      const abstractControl = group.get(key)  // get the refernce of the control
      if(abstractControl instanceof FormGroup){
        this.logkeyValuePair(abstractControl);
      }else{
        console.log("Key = " + key + " value = " + abstractControl.value);
      }
    })
  }
  onSubmit():void {
    console.log(this.employeeForm.value);
  }

  loadData():void {
    this.logkeyValuePair(this.employeeForm);
  }

}

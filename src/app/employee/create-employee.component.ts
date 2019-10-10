import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  validationMessages = {
    'fullName' : {
      'required':'Full Name is required',
      'maxlength': 'Full name must be less than 15 characters',
      'minlength':'Ful name must be greater than 3 characters'
    },
    'contactPreference':{
      'required':'Contact Prefernce is required'
    },
    'email': {
      'required':'Email is required'
    },
    'phone': {
      'required':'Phone is required'
    },
    'skillName': {
      'required': 'SkillName is required'
    },
    'experienceInYears':{ 
      'required':'experience is required',
    },
    'proficiency': {
      'required':'proficiency is required'
    }
  }

  formErrors =  {
    'fullName':'',
    'email':'',
    'phone':'',
    'contactPreference':'',
    'skillName':'',
    'experienceInYears':'',
    'proficiency':''
  }
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.employeeForm= this.fb.group({
      fullName: ['',[ Validators.required,Validators.maxLength(15),Validators.minLength(3)] ],
      contactPreference:['email',[Validators.required]],
      email: ['',[Validators.required, emailDomain]],
      phone: [''],
      skills: this.fb.group({
        skillName: ['',[ Validators.required ]],
        experienceInYears: ['',[ Validators.required ]],
        proficiency: ['',[ Validators.required ]]
      })
    })
    
    this.employeeForm.valueChanges.subscribe(
      () =>{
        this.logValidationErrors(this.employeeForm);
      }
    )

    this.employeeForm.get('contactPreference').valueChanges.subscribe(( data:string)=>{
      this.onContactPreferenceChange(data);
    })
  }


  onContactPreferenceChange(selectedValue: string) {
    const phoneFormControl= this.employeeForm.get('phone');
    const emailFormControl = this.employeeForm.get('email');
    
    if(selectedValue === 'phone'){
      phoneFormControl.setValidators(Validators.required);
      emailFormControl.clearValidators();
    }else {
      phoneFormControl.clearValidators();
    }
    
    if(selectedValue === 'email'){
      emailFormControl.setValidators([Validators.required,emailDomain]);
      phoneFormControl.clearValidators();
    }else {
      emailFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
    emailFormControl.updateValueAndValidity();
  }


/*   
   Controls can be marked as prestine, diry, disabled etc etc 
   use abstractControl. to enlist all different properties 
*/
  logValidationErrors(group: FormGroup = this.employeeForm):void {
    Object.keys(group.controls).forEach((key)=>{
      const abstractControl = group.get(key)  // get the refernce of the control
      if(abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      }else {
        // //console.log("Key = " + key + " value = " + abstractControl.value);
        //   if(abstractControl.errors.required){
        //     this.formErrors[key] += this.validationMessages[key].required;
        //   }else if(abstractControl.errors.maxLength){
        //     this.formErrors[key] += this.validationMessages[key].maxLength;
        //   }else if(abstractControl.errors.minLength){
        //     this.formErrors[key] +=  this.validationMessages[key].minLength
        //   }
        this.formErrors[key] = "";
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)){
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors){
              if(errorKey) {
                this.formErrors[key] += messages[errorKey] + ' ';
                console.log("Key Error",this.formErrors[key]);
              }
          }
        }
      }
    })
    console.log("formErrors", this.formErrors);
  }
  onSubmit():void {
    console.log(this.employeeForm.value);
  }

  loadData():void {
    this.logValidationErrors(this.employeeForm);
  }

}

function emailDomain(control: AbstractControl): {[key:string]:any} | null {
  const email:string = control.value;
  const domain = email.substring(email.lastIndexOf('@') +1 );
  if( email === "" || domain.toLowerCase() === 'gmail.com') {
    return null;
  }else {
    return { 'emailDomain': true }
  }
}

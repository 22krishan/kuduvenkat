import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes } from '@angular/router';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeesComponent } from './employee/list-employees.component';


const appRoutes: Routes = [
  { path:'list',component: ListEmployeesComponent },
  { path:'create',component: CreateEmployeeComponent },
  { path:'',redirectTo: 'list', pathMatch:'full'}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }

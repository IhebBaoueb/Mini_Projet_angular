import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDepartementComponent } from './form-departement/form-departement.component';
import { ListDepartementComponent } from './list-departement/list-departement.component';

const routes: Routes = [];

export const DepartementRoutes: Routes = [
  {
    path: '',
    children: [ 
{path:'',component: ListDepartementComponent},
{path:'list-departement',component: ListDepartementComponent},
{path: 'form-departement', component: FormDepartementComponent},
{path:'update/:idDepart', component: FormDepartementComponent}
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartementRoutingModule { }

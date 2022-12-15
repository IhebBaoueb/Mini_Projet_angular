import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratsComponent } from './contrats/contrats.component';
import { FormContratComponent } from './form-contrat/form-contrat.component';
import { MainContratComponent } from './main-contrat/main-contrat.component';
import { MaterialModule } from '../app.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path:'',component: MainContratComponent, children:[
      {path:'update/:id', component: UpdateComponent} , 
      {path:'', component: ContratsComponent},
      {path:'addContrat', component: FormContratComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    MaterialModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class ContratsRoutingModule { }

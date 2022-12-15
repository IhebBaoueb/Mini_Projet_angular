import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailEnseignantComponent } from './detail-enseignant/detail-enseignant.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { FormEnseignantComponent } from './form-enseignant/form-enseignant.component';
import { FormUpdateEnseignantComponent } from './form-update-enseignant/form-update-enseignant.component';
import { MainEnseignantComponent } from './main-enseignant/main-enseignant.component';
import { StatEnseignantComponent } from './stat-enseignant/stat-enseignant.component';

const routes: Routes = [
    {path:'',component: MainEnseignantComponent, children:[
      {path:'', component: EnseignantComponent},
      {path:'new', component: FormEnseignantComponent},
      {path:'stat', component: StatEnseignantComponent},
      {path:'update/:id',component:FormUpdateEnseignantComponent},
      {path:'view/:id', component:DetailEnseignantComponent}
    ]}, 
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantRoutingModule { }

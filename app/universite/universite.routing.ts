import { Routes } from '@angular/router';
import { FormUniversiteComponent } from './form-universite/form-universite.component';
import { ListUniversiteComponent } from './list-universite/list-universite.component';
import { UpdateUniversiteComponent } from './update-universite/update-universite.component';



export const UniversiteRoutes: Routes = [
    {
      path: '',
      children: [ 
  {path:'',component: ListUniversiteComponent},
  {path:'list-universite',component: ListUniversiteComponent},
  {path: 'form-universite', component: FormUniversiteComponent},
  {path:'update/:idUniv', component: UpdateUniversiteComponent},
  ]
    },
];

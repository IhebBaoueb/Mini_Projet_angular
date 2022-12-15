import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdModule } from '../md/md.module';
import { MaterialModule } from '../app.module';
import { EnseignantRoutingModule } from './enseignant-routing.module';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnseignantcardComponent } from './enseignantcard/enseignantcard.component';
import { FormEnseignantComponent } from './form-enseignant/form-enseignant.component';
import { EnseignantService } from './core/services/enseignant.service';
import { HttpClientModule } from '@angular/common/http';
import { FormUpdateEnseignantComponent } from './form-update-enseignant/form-update-enseignant.component';
import { MainEnseignantComponent } from './main-enseignant/main-enseignant.component';
import { DetailEnseignantComponent } from './detail-enseignant/detail-enseignant.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { StatEnseignantComponent } from './stat-enseignant/stat-enseignant.component';

@NgModule({
  declarations: [
    EnseignantComponent,
    EnseignantcardComponent,
    FormEnseignantComponent,
    FormUpdateEnseignantComponent,
    MainEnseignantComponent,
    DetailEnseignantComponent,
    StatEnseignantComponent
  ],
  imports: [
    CommonModule,
    EnseignantRoutingModule,
    MdModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    OrderModule,

  ],
  providers:[
    EnseignantService,
  ],
})
export class EnseignantModule { }

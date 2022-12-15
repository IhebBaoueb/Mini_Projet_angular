import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratsRoutingModule } from './contrats-routing.module';
import { ContratsComponent } from './contrats/contrats.component';
import { FormContratComponent } from './form-contrat/form-contrat.component';
import { MainContratComponent } from './main-contrat/main-contrat.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { RowsComponent } from './rows/rows.component';
import { UpdateComponent } from './update/update.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { PopupsComponent } from './popups/popups.component';
import { BrowserModule } from '@angular/platform-browser';
import { IgxDoughnutChartModule,IgxItemLegendModule } from 'igniteui-angular-charts';

@NgModule({
  declarations: [
    ContratsComponent,
    FormContratComponent,
    MainContratComponent,
    RowsComponent,
    UpdateComponent,
    // PopupsComponent,
  ],
  imports: [
    CommonModule,
    ContratsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    IgxItemLegendModule,
    IgxDoughnutChartModule
  ]
})
export class ContratsModule { }

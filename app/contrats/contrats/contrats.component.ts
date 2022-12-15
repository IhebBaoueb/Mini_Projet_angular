import { ListKeyManager } from '@angular/cdk/a11y';
import { Component, OnInit,ViewChild, ChangeDetectionStrategy, ChangeDetectorRef ,AfterViewInit } from '@angular/core';
import { Contrat, Specialite } from '../core/model/contrat';
import { ContratsService } from '../core/services/contrats.service';
import { Router } from '@angular/router';
import { OptionsItem, OptionChart } from './data';
import { IgxItemLegendComponent, IgxDoughnutChartComponent, IgxRingSeriesComponent } from 'igniteui-angular-charts';

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContratsComponent implements OnInit {
  public contrats: Contrat[];
  public clone_contrats: Contrat[];
  public contrats_filter: Contrat[];
  public contrats_header : string[];
  public search_id:string;
  public data_length:number;
  public page_number:number;
  public pages_number:number;
  public table_row_number:number;
  public row_start:number;
  public ia :number;
  public cloud :number;
  public reseau :number;
  public securite :number;
  public ia_str :string;
  public cloud_str :string;
  public reseau_str :string;
  public securite_str :string;
  public flag_chart:number;
  public sortDateDebut:number;
  public sortDateFin:number;
  public selected_option:string;
  public filter_by:Specialite
  constructor(private contratsService:ContratsService,
    private route: Router
    ,private _detector: ChangeDetectorRef
    ) { }

    @ViewChild("legend", { static: true } )
    private legend: IgxItemLegendComponent
    @ViewChild("chart", { static: true } )
    private chart: IgxDoughnutChartComponent
    @ViewChild("series", { static: true } )
    private series: IgxRingSeriesComponent
    private _OptionChart: OptionChart = null;
    public get OptionChart(): OptionChart {
        if (/*this.ia_str!="Ia 51%"  &&*/ this.flag_chart ==1)
        {
            this._OptionChart = new OptionChart(this.ia_str,this.reseau_str,this.cloud_str,this.securite_str);
            
        this.flag_chart = 0
          }
        return this._OptionChart;
    }
  ngOnInit(): void {
    this.sortDateDebut = 0;
    this.sortDateFin=0;
    this.flag_chart = 1;
this.reload_data()

  }
  reload_data(){
    this.flag_chart = 1
    this.contratsService.getAllContrats().subscribe(
      (data:Contrat[])=>{
        console.log("this is data",data)
        this.contrats=data;
        this.calculate_for_chart();
        this.OptionChart
        this.refresh_clone()
        this.data_length=this.contrats.length
        this.table_row_number = 2;
        this.updateAll()
        this.contrats_filter=this.clone_contrats.splice(this.row_start,this.table_row_number)
        this.contrats_header =Object.keys(this.contrats[0])
      })
}

    calculate_for_chart(){
      this.ia = 0
      this.cloud = 0
      this.reseau = 0
      this.securite = 0
      this.contrats.forEach((contrat)=>{
            if (contrat.specialite == Specialite.CLOUD){
                this.cloud +=1
            }else if(contrat.specialite == Specialite.IA){
              this.ia +=1
            }else if(contrat.specialite == Specialite.RESEAUX){
              this.reseau +=1
            }else if(contrat.specialite == Specialite.SECURITE){
              this.securite +=1
            }
      })
      this.ia = (this.ia/this.contrats.length)*100
      this.cloud = (this.cloud/this.contrats.length)*100
      this.securite = (this.securite/this.contrats.length)*100
      this.reseau = (this.reseau/this.contrats.length)*100
      this.ia_str = "IA "+this.ia.toFixed(2)+"%"
      this.cloud_str = "Cloud "+this.cloud.toFixed(2)+"%"
      this.securite_str = "Securite "+this.securite.toFixed(2)+"%"
      this.reseau_str = "Reseau "+this.reseau.toFixed(2) + "%" 
    }

    sortdd(){
      this.sortDateFin=0
      if (this.sortDateDebut==0){
        this.sortDateDebut=1
      }else if(this.sortDateDebut==1){
        this.sortDateDebut=2
        this.contrats.sort((a, b) => (a.dateDebutContrat < b.dateDebutContrat ? -1 : 1));
        this.updateAll()
      }else if(this.sortDateDebut==2){
        this.sortDateDebut=1
        this.contrats.sort((a, b) => (a.dateDebutContrat > b.dateDebutContrat ? -1 : 1));
        this.updateAll()
      }
    }

    sortdf(){
      this.sortDateDebut=0
      if (this.sortDateFin==0){
        this.sortDateFin=1
      }else if(this.sortDateFin==1){
        this.sortDateFin=2
        this.contrats.sort((a, b) => (a.dateFinContrat < b.dateFinContrat ? -1 : 1));
        this.updateAll()
      }else if(this.sortDateFin==2){
        this.sortDateFin=1
        this.contrats.sort((a, b) => (a.dateFinContrat > b.dateFinContrat ? -1 : 1));
        this.updateAll()
      }
    }
    search_table(){
      this.contrats_filter = this.contrats.filter((contrat)=>
        contrat.idContrat.toString() == this.search_id
      )
      if(this.search_id==""){
        this.contrats_filter = this.contrats
      }
    }
    delete_th_contrat(id:number){
      this.contratsService.deleteContrat(id).subscribe(
        ()=> this.reload_data(),
        ()=>{console.log('error'),
        ()=>{console.log('complete') }}
      )
    }



    GoNext(){
      this.refresh_clone()
      this.row_start = Math.min(this.row_start + this.table_row_number,this.data_length)
      this.page_number++;
      this.contrats_filter = this.clone_contrats.splice(this.row_start,this.table_row_number)
      this.refresh_clone()
    }
    GoPrev(){
      this.refresh_clone()
      this.row_start = Math.max(this.row_start - this.table_row_number,0)
      this.page_number--;
      this.contrats_filter = this.clone_contrats.splice(this.row_start,this.table_row_number)
      this.refresh_clone()
    }

    updateAll(){
      this.refresh_clone()
      this.table_row_number = Math.min(this.table_row_number,this.data_length)
      this.table_row_number = Math.max(this.table_row_number,1)
      this.pages_number = Math.ceil(this.data_length/this.table_row_number)
      this.row_start = 0;
      this.page_number = 1;
      this.contrats_filter = this.clone_contrats.splice(this.row_start,this.table_row_number)
      this.refresh_clone()
    }

    refresh_clone(){
      this.clone_contrats = [...this.contrats]
    }
}

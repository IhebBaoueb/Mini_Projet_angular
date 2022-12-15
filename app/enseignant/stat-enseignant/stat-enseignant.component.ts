import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { EnseignantService } from '../core/services/enseignant.service';

@Component({
  selector: 'app-stat-enseignant',
  templateUrl: './stat-enseignant.component.html',
  styleUrls: ['./stat-enseignant.component.css']
})
export class StatEnseignantComponent implements OnInit {
  public gradeList :String[] = ['A', 'B', 'C', 'D'];
  constructor(private enseignantService: EnseignantService) { }
  public nbrEnseignantList : number[];
  ngOnInit(): void {

    this.enseignantService.getListStat().subscribe(res => {
      (data: number[]) => this.nbrEnseignantList = data;
        console.log(res);
        var myChart = new Chart("myChart", {
          type: 'bar',
          data: {
              labels: this.gradeList,
              datasets: [{
                  label: 'Le nombre des enseignants par grade',
                  data: res,
                  backgroundColor:"#0196FD",
                  borderColor: "#0196FD",
                  borderWidth: 1
              }
              ]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
      } )
    
    }
   
    
  }


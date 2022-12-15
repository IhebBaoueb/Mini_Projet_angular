import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {Etudiant} from '../core/models/etudiant';
import {EtudiantService} from '../core/services/etudiant.service';

@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css']
})
export class ListEtudiantComponent implements OnInit {
  @ViewChild('content', {static: false}) el!: ElementRef;

  constructor(private etudiantService: EtudiantService) { }
  etudiant: Etudiant;
  listEtudiant: Etudiant[];
  cloneListEtudiant: Etudiant[];

  ngOnInit(): void {
    this.etudiant = new Etudiant();
    this.etudiantService.getAllEtudiant().subscribe((data) => {

      this.listEtudiant =JSON.parse(JSON.stringify(data));
      this.cloneListEtudiant=[...this.listEtudiant]
      console.log(data);
    } 
    );
  }
  delete(idEtudiant: number) {
    this.etudiantService.deleteEtudiant(idEtudiant).subscribe((data) => {
      this.listEtudiant
      location.reload();
    });
  }
  searchById(){
    if(this.etudiant.idEtudiant){
      this.cloneListEtudiant = this.listEtudiant.filter(etd => etd.idEtudiant==this.etudiant.idEtudiant);
  
    }else{
      this.cloneListEtudiant=[...this.listEtudiant];
    }
    }

}

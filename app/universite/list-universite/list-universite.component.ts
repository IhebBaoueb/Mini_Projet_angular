import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Universite } from '../core/universite';
import { UniversiteService } from '../core/universite.service';

@Component({
  selector: 'app-list-universite',
  templateUrl: './list-universite.component.html',

})
export class ListUniversiteComponent implements OnInit {
  @ViewChild('content', {static: false}) el!: ElementRef;
  constructor(private universiteService:UniversiteService) { }
  universite:Universite;
  listUniversite:Universite[];
  listUniversite_clone:Universite[];
  search_by:string;
  sort_by:string;




  ngOnInit(): void {
    this.universite = new Universite();
    this.universiteService.getUniversite().subscribe((data:Universite[]) => {this.listUniversite=data
      this.listUniversite_clone =  [...this.listUniversite]});
  }
   //delete
   deleteUniv(id:number){
    this.universiteService.deleteUniversite(id).subscribe((data)=>{
      
    this.universiteService.getUniversite().subscribe((data:Universite[]) => {this.listUniversite=data
      this.listUniversite_clone =  [...this.listUniversite]});
    })
  }
  load_filtred(){
    if (this.search_by){
    this.listUniversite_clone =  this.listUniversite.filter(univ=>
       univ.nomUniv.includes(this.search_by)
    )}else{
      this.listUniversite_clone =  [...this.listUniversite]
    }
  }

  sortby(){
    if(this.sort_by=="all"){
      this.listUniversite_clone =  [...this.listUniversite]
    }else if(this.sort_by=="asc"){
      this.listUniversite_clone.sort((a,b)=>(a.nomUniv > b.nomUniv ? -1:1))
    }else{
      
      this.listUniversite_clone.sort((a,b)=>(a.nomUniv < b.nomUniv ? -1:1))
    }
  }

}

import { Component, Input, OnInit, Output,EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { Contrat } from '../core/model/contrat';

declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";//"pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-rows',
  templateUrl: './rows.component.html',
  styleUrls: ['./rows.component.css']
})
export class RowsComponent implements OnInit {
  @ViewChild('pdfTable') pdfTable: ElementRef;
  @Input() row:Contrat;
  @Output() delete_contrat= new EventEmitter<number>();
  public show_delete:boolean;
  public show_info:boolean;
  constructor() { }

  ngOnInit(): void {
    this.show_delete = true
    this.show_info = true
  }

  open_popup(){
    this.show_delete = !this.show_delete
  }

  open_info_popup(){
    this.show_info = !this.show_info
  }

  
  public exportPDF() {
    this.open_info_popup()
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 
  }

  delete_the_contrat(){
    this.open_popup()
    this.delete_contrat.emit(this.row.idContrat);
  }

}

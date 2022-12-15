//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder } from '@angular/forms';
import { Enseignant } from '../core/model/enseignant';
import { EnseignantService } from '../core/services/enseignant.service';
import { Router, ActivatedRoute } from '@angular/router';
import { data } from 'jquery';

declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


declare const $: any;
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: EventTarget;
  getMessage(): string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-detail-enseignant',
  templateUrl: './detail-enseignant.component.html',
  styleUrls: ['./detail-enseignant.component.css']
})


export class DetailEnseignantComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('pdfTable') pdfTable!: ElementRef;
  public enseignant: Enseignant;
  public listNomEquipe: String[];
  nomEquipe: String;
  downloadStatus = 0;
  //public listIdEtudiant: number[];
  //public listIdEtudiants = new Array<any>();
  public listEtudiant: String[];
  public listEtudiants = new Array<any>();
  currentEquipe: string[];
  public listEquipe: String[];
  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private route: Router, private currentRoute: ActivatedRoute, private enseignantService: EnseignantService) { }
  ngOnInit() {

    this.enseignant=new Enseignant();
    let id = this.currentRoute.snapshot.params['id'];
    if (id != null) {
      //update
      this.enseignantService.getEnseignantById(id).subscribe(
        (data: Enseignant) => { this.enseignant = data }
      )
      this.enseignantService.findEquipeNomEquipeByEnseignantIdEnseignant(id).subscribe(
        (data: String[]) => this.listNomEquipe = data
      )

      this.enseignantService.findEquipeNomEquipeByEnseignantIdEnseignant(id).subscribe(() => {
          (data: String[]) => this.listNomEquipe = data;
          for (let valeur of this.listNomEquipe) {
            this.enseignantService.findListEtudiantsByEquipeAndEnseignant2(id, valeur).subscribe(res => {
              (data: String[]) => this.listEtudiant = data;
              console.log(res);
              this.listEtudiants.push(res);
            }
            )
          }
          console.log(this.listEtudiants);
        }
        )
        this.enseignantService.findAutresEquipes(id).subscribe(
          (data: String[]) => this.listEquipe = data
        )

    }
  


  const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');


  // Wizard Initialization
  $('.card-wizard').bootstrapWizard({
    'tabClass': 'nav nav-pills',
    'nextSelector': '.btn-next',
    'previousSelector': '.btn-previous',

    onNext: function(tab, navigation, index) {
      var $valid = $('.card-wizard form').valid();

    },

      onInit: function(tab: any, navigation: any, index: any) {

        // check number of tabs and fill the entire row
        let $total = navigation.find('li').length;
        let $wizard = navigation.closest('.card-wizard');

        let $first_li = navigation.find('li:first-child a').html();
        let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
        $('.card-wizard .wizard-navigation').append($moving_div);

        $total = $wizard.find('.nav li').length;
        let $li_width = 100 / $total;

        let total_steps = $wizard.find('.nav li').length;
        let move_distance = $wizard.width() / total_steps;
        let index_temp = index;
        let vertical_level = 0;
      },



onTabShow: function(tab: any, navigation: any, index: any) {
  let $total = navigation.find('li').length;
  let $current = index + 1;
  elemMainPanel.scrollTop = 0;
  const $wizard = navigation.closest('.card-wizard');

  // If it's the last tab then hide the last button and show the finish instead
  if ($current >= $total) {
    $($wizard).find('.btn-next').hide();
    $($wizard).find('.btn-finish').show();
  } else {
    $($wizard).find('.btn-next').show();
    $($wizard).find('.btn-finish').hide();
  }

  const button_text = navigation.find('li:nth-child(' + $current + ') a').html();

  setTimeout(function () {
    $('.moving-tab').text(button_text);
  }, 150);


  $total = $wizard.find('.nav li').length;
  let $li_width = 100 / $total;

  let total_steps = $wizard.find('.nav li').length;
  let move_distance = $wizard.width() / total_steps;
  let index_temp = index;
  let vertical_level = 0;

  let mobile_device = $(document).width() < 600 && $total > 3;

  if (mobile_device) {
    move_distance = $wizard.width() / 2;
    index_temp = index % 2;
    $li_width = 50;
  }

  $wizard.find('.nav li').css('width', $li_width + '%');

  let step_width = move_distance;
  move_distance = move_distance * index_temp;

  $current = index + 1;

  if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
    move_distance -= 8;
  } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
    move_distance += 8;
  }

  if (mobile_device) {
    let x: any = index / 2;
    vertical_level = parseInt(x);
    vertical_level = vertical_level * 38;
  }

  $wizard.find('.moving-tab').css('width', step_width);
  $('.moving-tab').css({
    'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

  });
}
        });


// Prepare the preview for profile picture
$('#wizard-picture').change(function () {
  const input = $(this);

  if (input[0].files && input[0].files[0]) {
    const reader = new FileReader();

    reader.onload = function (e: any) {
      $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
    };
    reader.readAsDataURL(input[0].files[0]);
  }
});

$('[data-toggle="wizard-radio"]').click(function () {
  const wizard = $(this).closest('.card-wizard');
  wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
  $(this).addClass('active');
  $(wizard).find('[type="radio"]').removeAttr('checked');
  $(this).find('[type="radio"]').attr('checked', 'true');
});

$('[data-toggle="wizard-checkbox"]').click(function () {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(this).find('[type="checkbox"]').removeAttr('checked');
  } else {
    $(this).addClass('active');
    $(this).find('[type="checkbox"]').attr('checked', 'true');
  }
});

$('.set-full-height').css('height', 'auto');

    }




    affecter(){
      let id = this.currentRoute.snapshot.params['id'];
      for(let i of this.currentEquipe){
      this.enseignantService.affecterEnseignantToEquipe(id ,i,this.enseignant ).subscribe(
        () => this.route.navigate(['/enseignant']),
        (data: Enseignant) => { this.enseignant = data }
       // ()=>this.route.navigate(['/enseignant'])
      )
      // this.enseignantService.findEquipeNomEquipeByEnseignantIdEnseignant(id).subscribe(
      //   (data: String[]) => this.listNomEquipe = data
      // )

      // this.enseignantService.findEquipeNomEquipeByEnseignantIdEnseignant(id).subscribe(() => {
      //     (data: String[]) => this.listNomEquipe = data;
      //     for (let valeur of this.listNomEquipe) {
      //       this.enseignantService.findListEtudiantsByEquipeAndEnseignant2(id, valeur).subscribe(res => {
      //         (data: String[]) => this.listEtudiant = data;
      //         console.log(res);
      //         this.listEtudiants.push(res);
      //       }
      //       )
      //     }
      //     console.log(this.listEtudiants);
      //   }
      //   )
      
    }
  }
    


    public exportPDF() {
      this.downloadStatus = 1;
      setTimeout(() => {
        this.downloadStatus = 2
      }, 2000);
      const pdfTable = this.pdfTable.nativeElement;
      var html = htmlToPdfmake(pdfTable.innerHTML);
      const documentDefinition = { content: html };
      pdfMake.createPdf(documentDefinition).download(); 
       
    }




    

ngOnChanges(changes: SimpleChanges) {
  const input = $(this);

  if (input[0].files && input[0].files[0]) {
    const reader: any = new FileReader();

    reader.onload = function (e: any) {
      $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
    };
    reader.readAsDataURL(input[0].files[0]);
  }
}
ngAfterViewInit() {

  $(window).resize(() => {
    $('.card-wizard').each(function () {
      setTimeout(() => {
        const $wizard = $(this);
        const index = $wizard.bootstrapWizard('currentIndex');
        let $total = $wizard.find('.nav li').length;
        let $li_width = 100 / $total;

        let total_steps = $wizard.find('.nav li').length;
        let move_distance = $wizard.width() / total_steps;
        let index_temp = index;
        let vertical_level = 0;

        let mobile_device = $(document).width() < 600 && $total > 3;
        if (mobile_device) {
          move_distance = $wizard.width() / 2;
          index_temp = index % 2;
          $li_width = 50;
        }

        $wizard.find('.nav li').css('width', $li_width + '%');

        let step_width = move_distance;
        move_distance = move_distance * index_temp;

        let $current = index + 1;

        if ($current == 1 || (mobile_device == true && (index % 2 == 0))) {
          move_distance -= 8;
        } else if ($current == total_steps || (mobile_device == true && (index % 2 == 1))) {
          move_distance += 8;
        }

        if (mobile_device) {
          let x: any = index / 2;
          vertical_level = parseInt(x);
          vertical_level = vertical_level * 38;
        }

        $wizard.find('.moving-tab').css('width', step_width);
        $('.moving-tab').css({
          'transform': 'translate3d(' + move_distance + 'px, ' + vertical_level + 'px, 0)',
          'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
        });

        $('.moving-tab').css({
          'transition': 'transform 0s'
        });
      }, 500)

    });
  });

}
}


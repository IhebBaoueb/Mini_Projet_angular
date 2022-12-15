export enum Option {
    GAMIX = "GAMIX",
    SE = "SE",
    SIM = "SIM",
    NIDS = "NIDS"
  }
export class Etudiant{
    idEtudiant:number;
    prenomE:string;
    nomE:string;
    opt:Option;
    contrat:Object[];
    departement:Object;
    equipes:Object[];
}
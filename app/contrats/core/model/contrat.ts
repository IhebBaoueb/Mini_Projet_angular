import { Etudiant } from "./etudiant";

export enum Specialite {
    IA = 'IA',
    RESEAUX = 'RESEAUX',
    CLOUD = 'CLOUD',
    SECURITE = 'SECURITE'
  }
export class Contrat{
    idContrat:number;
    dateDebutContrat:Date;
    dateFinContrat:Date;
    specialite:Specialite;
    archive:Boolean;
    etudiant:Etudiant;
    description:string;
}
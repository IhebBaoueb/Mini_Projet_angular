import { DetailEquipe } from "./detailsEquipe";
import { Etudiant } from "./etudiant";
import { Niveau } from "./niveau";

export class Equipe{
    idEquipe: number;
    nomEquipe: string;
    niveau: Niveau;
    detailEquipe: DetailEquipe;
    etudiants: [Etudiant];
    }
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Classe {
  id: number;
  nom: string;
}

export interface Etudiant {
  id: number;
  nom: string;
  classeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _classes: Classe[] = [];
  private _etudiants: Etudiant[] = [];

  private _classesSubject = new BehaviorSubject<Classe[]>([]);
  classes$ = this._classesSubject.asObservable();

  private _etudiantsSubject = new BehaviorSubject<Etudiant[]>([]);
  etudiants$ = this._etudiantsSubject.asObservable();

  constructor() {
    this._classes = [
      { id: 1, nom: 'Terminal S1' },
      { id: 2, nom: 'Terminal S2' },
      { id: 3, nom: 'Terminal L1a' },
      { id: 4, nom: 'Terminal L2b' }
    ];

    this._etudiants = [
      { id: 1, nom: 'Penda Sarr', classeId: 2 },
      { id: 2, nom: 'Amadou Diallo', classeId: 1 },
      { id: 3, nom: 'Fatou Seck', classeId: 3 }
    ];

    this._classesSubject.next(this._classes);
    this._etudiantsSubject.next(this._etudiants);
  }

  ajouterClasse(classe: Classe) {
    if (!this._classes.find(c => c.nom === classe.nom)) {
      classe.id = this._classes.length + 1;
      this._classes.push(classe);
      this._classesSubject.next(this._classes);
      return true;
    }
    return false;
  }

  modifierClasse(classe: Classe) {
    const index = this._classes.findIndex(c => c.id === classe.id);
    if (index !== -1) {
      if (!this._classes.find(c => c.nom === classe.nom || c.id === classe.id)) {
        this._classes[index] = classe;
        this._classesSubject.next(this._classes);
        return true;
      }
    }
    return false;
  }

  supprimerClasse(id: number) {
    this._classes = this._classes.filter(c => c.id !== id);
    this._classesSubject.next(this._classes);
  }

  ajouterEtudiant(etudiant: Etudiant) {
    etudiant.id = this._etudiants.length + 1;
    this._etudiants.push(etudiant);
    this._etudiantsSubject.next(this._etudiants);
  }

  modifierEtudiant(etudiant: Etudiant) {
    const index = this._etudiants.findIndex(e => e.id === etudiant.id);
    if (index !== -1) {
      this._etudiants[index] = etudiant;
      this._etudiantsSubject.next(this._etudiants);
    }
  }

  supprimerEtudiant(id: number) {
    this._etudiants = this._etudiants.filter(e => e.id !== id);
    this._etudiantsSubject.next(this._etudiants);
  }
}
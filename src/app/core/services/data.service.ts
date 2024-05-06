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
    this.loadLocalStorage();
  }

  private loadLocalStorage() {
    const classesData = localStorage.getItem('classes');
    const etudiantsData = localStorage.getItem('etudiants');
  
    if (classesData !== null) {
      this._classes = JSON.parse(classesData);
      this._classesSubject.next(this._classes);
    }
  
    if (etudiantsData !== null) {
      this._etudiants = JSON.parse(etudiantsData);
      this._etudiantsSubject.next(this._etudiants);
    }
  }
  

  private saveToLocalStorage() {
    localStorage.setItem('classes', JSON.stringify(this._classes));
    localStorage.setItem('etudiants', JSON.stringify(this._etudiants));
  }

  ajouterClasse(classe: Classe) {
    if (!this._classes.find(c => c.nom === classe.nom)) {
      classe.id = this._classes.length + 1;
      this._classes.push(classe);
      this.saveToLocalStorage(); 
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
        this.saveToLocalStorage(); 
        this._classesSubject.next(this._classes);
        return true;
      }
    }
    return false;
  }

  supprimerClasse(id: number) {
    this._classes = this._classes.filter(c => c.id !== id);
    this.saveToLocalStorage(); 
    this._classesSubject.next(this._classes);
  }

  ajouterEtudiant(etudiant: Etudiant) {
    etudiant.id = this._etudiants.length + 1;
    this._etudiants.push(etudiant);
    this.saveToLocalStorage();
    this._etudiantsSubject.next(this._etudiants);
  }

  modifierEtudiant(etudiant: Etudiant) {
    const index = this._etudiants.findIndex(e => e.id === etudiant.id);
    if (index !== -1) {
      this._etudiants[index] = etudiant;
      this.saveToLocalStorage(); 
      this._etudiantsSubject.next(this._etudiants);
    }
  }

  supprimerEtudiant(id: number) {
    this._etudiants = this._etudiants.filter(e => e.id !== id);
    this.saveToLocalStorage();
    this._etudiantsSubject.next(this._etudiants);
  }
}

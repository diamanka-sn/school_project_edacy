import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, combineLatest, map } from 'rxjs';
import { Classe, DataService, Etudiant } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-eleve-list',
  templateUrl: './eleve-list.component.html',
  styleUrls: ['./eleve-list.component.scss']
})
export class EleveListComponent {
  etudiants$!: Observable<{ etudiant: Etudiant; classe: Classe | undefined }[]>;
  classes$!: Observable<Classe[]>;
  eleveForm!: FormGroup;
  isEditMode = false;
  editedEtudiant: Etudiant | null = null;

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.classes$ = this.dataService.classes$;

    this.etudiants$ = combineLatest([
      this.dataService.etudiants$,
      this.dataService.classes$
    ]).pipe(
      map(([etudiants, classes]) =>
        etudiants.map((etudiant:Etudiant) => ({
          etudiant,
          classe: classes.find((c:Classe) => c.id === etudiant.classeId)
        }))
      )
    );

    this.eleveForm = this.fb.group({
      nom: ['', Validators.required],
      classeId: ['', Validators.required]
    });
  }

  supprimerEtudiant(id: number) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer cet élève ?`)) {
      this.dataService.supprimerEtudiant(id);
    }
  }

  onSubmit() {
    if (this.eleveForm.valid) {
      const etudiant = this.eleveForm.value;
      if (this.isEditMode) {
        etudiant.id = this.editedEtudiant?.id;
        this.dataService.modifierEtudiant(etudiant);
      } else {
        console.log(etudiant)
        this.dataService.ajouterEtudiant(etudiant);
      }
      this.eleveForm.reset();
      this.isEditMode = false;
      this.editedEtudiant = null;
    }
  }

  editEtudiant(etudiant: Etudiant) {
    this.isEditMode = true;
    this.editedEtudiant = etudiant;
    this.eleveForm.patchValue({
      nom: etudiant.nom,
      classeId: etudiant.classeId
    });
  }
}

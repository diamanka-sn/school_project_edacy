import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, combineLatest, map } from 'rxjs';
import { Classe, DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.scss']
})
export class ClasseListComponent {
  classes$!: Observable<{ classe: Classe; nombreEtudiants: number }[]>;
  classForm!: FormGroup;
  isEditMode = false;
  editedClass: Classe | null = null;

  constructor(private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    // this.classes$ = this.dataService.classes$;
    this.classes$ = combineLatest([
      this.dataService.classes$,
      this.dataService.etudiants$
    ]).pipe(
      map(([classes, etudiants]) =>
        classes.map(classe => ({
          classe,
          nombreEtudiants: etudiants.filter(e => e.classeId === classe.id).length
        }))
      )
    );

    this.classForm = this.fb.group({
      nom: ['', Validators.required]
    });
    this.classForm = this.fb.group({
      nom: ['', Validators.required]
    });
  }

  supprimerClasse(classe: Classe) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la classe "${classe.nom}" ?`)) {
      this.dataService.supprimerClasse(classe.id);
    }
  }

  onSubmit() {
    if (this.classForm.valid) {
      const classe = this.classForm.value;
      if (this.isEditMode) {
        classe.id = this.editedClass?.id;
        if (confirm("Êtes-vous sûr de vouloir modifier la classe ?")) {
          this.dataService.modifierClasse(classe);
        }
      } else {
        this.dataService.ajouterClasse(classe);
      }
      this.classForm.reset();
      this.isEditMode = false;
      this.editedClass = null;
    }
  }

  editClasse(classe: Classe) {
    this.isEditMode = true;
    this.editedClass = classe;
    this.classForm.patchValue({ nom: classe.nom });
  }
}

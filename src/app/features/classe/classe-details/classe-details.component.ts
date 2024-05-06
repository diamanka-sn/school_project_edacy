import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Classe, DataService, Etudiant } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-classe-details',
  templateUrl: './classe-details.component.html',
  styleUrls: ['./classe-details.component.scss']
})
export class ClasseDetailsComponent {
  classe!: Classe | undefined;
  etudiants$: Observable<Etudiant[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const classeId = this.route.snapshot.paramMap.get('id');

    if (classeId) {
      this.dataService.classes$.subscribe((classes) => {
        this.classe = classes.find((c) => c.id === parseInt(classeId, 10));
      });

      this.etudiants$ = this.dataService.etudiants$.pipe(
        map((etudiants: Etudiant[]) =>
          etudiants.filter((e: { classeId: number; }) => e.classeId === parseInt(classeId, 10))
        )
      );
    }
  }
}

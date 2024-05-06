import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasseListComponent } from './features/classe/classe-list/classe-list.component';
import { ClasseModule } from './features/classe/classe.module';
import { EleveModule } from './features/eleve/eleve.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'classe',
    pathMatch: 'full',
  },
  {
    path: 'classe',
    loadChildren:()=>import("./features/classe/classe.module").then(m=>ClasseModule),
  },
  {
    path: 'eleve',
    loadChildren:()=>import("./features/eleve/eleve.module").then(m=>EleveModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

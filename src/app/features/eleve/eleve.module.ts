import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EleveListComponent } from './eleve-list/eleve-list.component';
import { EleveDetailsComponent } from './eleve-details/eleve-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const eleveRoute: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: EleveListComponent,
      },
      {
        path: ':id',
        component: EleveDetailsComponent,
      }
    ]
  }
]


@NgModule({
  declarations: [
    EleveListComponent,
    EleveDetailsComponent
  ],
  imports: [
    RouterModule.forChild(eleveRoute),
    CommonModule,
    SharedModule
  ]
})
export class EleveModule { }

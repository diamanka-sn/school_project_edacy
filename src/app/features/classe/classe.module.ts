import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasseDetailsComponent } from './classe-details/classe-details.component';
import { ClasseListComponent } from './classe-list/classe-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
const classeRoute: Routes = [
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
        component: ClasseListComponent,
      },
      {
        path: ':id',
        component: ClasseDetailsComponent,
      }
    ]
  }
]


@NgModule({
  declarations: [
    ClasseDetailsComponent,
    ClasseListComponent,
  ],
  imports: [
    RouterModule.forChild(classeRoute),
    CommonModule,
    SharedModule,
  
  ]
})
export class ClasseModule { }

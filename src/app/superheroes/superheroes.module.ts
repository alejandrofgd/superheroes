import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { SuperheroesRoutingModule } from './superheroes-routing.module';
import { SuperheroPageComponent } from './pages/hero-page/superhero-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { SuperheroImagePipe } from './pipes/superhero-image.pipe';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    SuperheroPageComponent,
    LayoutPageComponent,
    NewPageComponent,
    ListPageComponent,
    CardComponent,
    SuperheroImagePipe,
    ConfirmDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    SuperheroesRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class SuperheroesModule { }

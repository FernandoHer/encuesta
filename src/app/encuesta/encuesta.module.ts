import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestaRoutingModule } from './encuesta-routing.module';
import { PagesComponent } from './pages/pages.component';
import { SelectorComponent } from './pages/selector/selector/selector.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagesComponent,
    SelectorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncuestaRoutingModule
  ]
})
export class EncuestaModule { }

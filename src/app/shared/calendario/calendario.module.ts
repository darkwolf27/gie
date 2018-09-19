import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioMesComponent } from './calendario-mes.component';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule
  ],
  declarations: [
    CalendarioMesComponent
  ],
  exports: [
    CalendarioMesComponent
  ]
})
export class CalendarioModule { }

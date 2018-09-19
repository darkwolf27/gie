import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeraMayusculaPipe } from './primera-mayuscula.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PrimeraMayusculaPipe
  ],
  exports: [
    PrimeraMayusculaPipe
  ]
})
export class PipesModule { }

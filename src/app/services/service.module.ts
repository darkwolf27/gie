import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BeneficioService } from './beneficio.service';
import { UsuarioService } from './usuario.service';
import { LoginGuardGuard } from './guards/login.guard';
import { TrabajadoresService } from './trabajadores.service';
import { CifraNegocioService } from './cifra-negocio.service';
import { ValorService } from './valor.service';
import { CostesLaboralesService } from './costes-laborales.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    BeneficioService,
    UsuarioService,
    LoginGuardGuard,
    TrabajadoresService,
    CifraNegocioService,
    ValorService,
    CostesLaboralesService
  ],
  declarations: []
})
export class ServiceModule { }

import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { APP_ROUTING } from './app.routing';
import { AreaInternaComponent } from './components/area-interna/area-interna.component';
import { BeneficioComponent } from './components/beneficio/beneficio.component';

import { TrabajadoresComponent } from './components/trabajadores/trabajadores.component';
import { ServiceModule } from './services/service.module';
import { RegistroComponent } from './components/registro/registro.component';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';
import { EmpresasAsignadasComponent } from './components/empresas-asignadas/empresas-asignadas.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { PatNetoComponent } from './components/pat-neto/pat-neto.component';
import { CostesLaboralesComponent } from './components/costes-laborales/costes-laborales.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { CalendarioModule } from './shared/calendario/calendario.module';
import { TrabajadorAltaComponent } from './components/trabajador-alta/trabajador-alta.component';
import { PipesModule } from './shared/pipes/pipes.module';
import { PanelControlComponent } from './components/panel-control/panel-control.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AreaInternaComponent,
    BeneficioComponent,
    TrabajadoresComponent,
    RegistroComponent,
    ListUsuariosComponent,
    EmpresasAsignadasComponent,
    IngresosComponent,
    GastosComponent,
    PatNetoComponent,
    CostesLaboralesComponent,
    CalendarioComponent,
    TrabajadorAltaComponent,
    PanelControlComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    PipesModule,
    NgxChartsModule,
    SweetAlert2Module.forRoot(),
    CalendarioModule,
    APP_ROUTING
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

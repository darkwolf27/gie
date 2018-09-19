import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AreaInternaComponent } from './components/area-interna/area-interna.component';
import { BeneficioComponent } from './components/beneficio/beneficio.component';
import { TrabajadoresComponent } from './components/trabajadores/trabajadores.component';
import { LoginGuardGuard } from './services/guards/login.guard';
import { RegistroComponent } from './components/registro/registro.component';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';
import { EmpresasAsignadasComponent } from './components/empresas-asignadas/empresas-asignadas.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { PatNetoComponent } from './components/pat-neto/pat-neto.component';
import { CostesLaboralesComponent } from './components/costes-laborales/costes-laborales.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { TrabajadorAltaComponent } from './components/trabajador-alta/trabajador-alta.component';
import { PanelControlComponent } from './components/panel-control/panel-control.component';

const ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'area-interna', component: AreaInternaComponent, canActivate: [LoginGuardGuard], children: [
        {path: 'panel-control', component: PanelControlComponent},
        {path: 'calendario', component: CalendarioComponent},
        {path: 'usuarios', component: ListUsuariosComponent},
        {path: 'registro', component: RegistroComponent},
        {path: 'usuario/empresas/:id', component: EmpresasAsignadasComponent},
        {path: 'beneficio', component: BeneficioComponent},
        {path: 'beneficio/:empresa', component: BeneficioComponent},
        {path: 'ingresos/:empresa', component: IngresosComponent},
        {path: 'gastos/:empresa', component: GastosComponent},
        {path: 'valor/:empresa', component: PatNetoComponent},
        {path: 'trabajadores/:empresa', component: TrabajadoresComponent},
        {path: 'alta-trabajador', component: TrabajadorAltaComponent},
        {path: 'costes-trabajadores/:empresa', component: CostesLaboralesComponent},
        { path: '', pathMatch: 'full', redirectTo: 'panel-control' }
    ] },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }

];

export const APP_ROUTING = RouterModule.forRoot(ROUTES, { useHash: true });

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AreaInternaComponent } from './components/area-interna/area-interna.component';
import { BeneficioComponent } from './components/beneficio/beneficio.component';
import { TrabajadoresComponent } from './components/trabajadores/trabajadores.component';
import { LoginGuardGuard } from './services/guards/login.guard';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';
import { EmpresasAsignadasComponent } from './components/empresas-asignadas/empresas-asignadas.component';

const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'area-interna', component: AreaInternaComponent, canActivate: [LoginGuardGuard], children: [
        {path: 'usuarios', component: ListUsuariosComponent},
        {path: 'empresas-asignadas', component: EmpresasAsignadasComponent},
        {path: 'beneficio', component: BeneficioComponent},
        {path: 'trabajadores', component: TrabajadoresComponent},
        {path: '', pathMatch: 'full', redirectTo: 'beneficio' }
    ] },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }


];

export const APP_ROUTING = RouterModule.forRoot(ROUTES, { useHash: true });

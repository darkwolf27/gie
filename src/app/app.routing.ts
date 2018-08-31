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
import { CifraNegocioComponent } from './components/cifra-negocio/cifra-negocio.component';
import { PatNetoComponent } from './components/pat-neto/pat-neto.component';
import { CostesLaboralesComponent } from './components/costes-laborales/costes-laborales.component';

const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'area-interna', component: AreaInternaComponent, canActivate: [LoginGuardGuard], children: [
        {path: 'home', component: HomeComponent},
        {path: 'usuarios', component: ListUsuariosComponent},
        {path: 'registro', component: RegistroComponent},
        {path: 'usuario/empresas/:id', component: EmpresasAsignadasComponent},
        {path: 'beneficio', component: BeneficioComponent},
        {path: 'beneficio/:empresa', component: BeneficioComponent},
        {path: 'ventas/:empresa', component: CifraNegocioComponent},
        {path: 'valor/:empresa', component: PatNetoComponent},
        {path: 'trabajadores/:empresa', component: TrabajadoresComponent},
        {path: 'costes-trabajadores/:empresa', component: CostesLaboralesComponent},
        { path: '', pathMatch: 'full', redirectTo: 'home' }
    ] },
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: '**', pathMatch: 'full', redirectTo: 'login' }


];

export const APP_ROUTING = RouterModule.forRoot(ROUTES, { useHash: true });

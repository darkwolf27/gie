import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-area-interna',
  templateUrl: './area-interna.component.html',
  styleUrls: ['./area-interna.component.scss']
})
export class AreaInternaComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  panelOpenState = false;
  usuario: Usuario;
  empresa;
  nombreBtnEmpresa: string;
  nombreBtnEmpresaMobile: string;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
     private _router: Router,
     private _usuarioSV: UsuarioService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._usuarioSV.mobile = this.mobileQuery.matches;
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges();
      this._usuarioSV.mobile = this.mobileQuery.matches;
    };
    this.mobileQuery.addListener(this._mobileQueryListener);
    if (this._usuarioSV.empresa) {
      this.empresa = this._usuarioSV.empresa;
      this.nombreBtnEmpresa = this.empresa.nombre;
      this.nombreBtnEmpresaMobile = `Empresa Nº ${this.empresa.codigo}`;
    } else {
      this.nombreBtnEmpresa = 'Empresas';
      this.nombreBtnEmpresaMobile = 'Empresas';
      this.empresa = {};
    }
  }

  @ViewChild('ListEmpresas') private ListEmpresas: SwalComponent;

  ngOnInit() {
    this.usuario = this._usuarioSV.usuario;
    this._usuarioSV.observableEmpresa.subscribe(
      empresa => {
        if (empresa) {
          this.empresa = empresa;
          this.cambioNombre(empresa);
        }
      }
    );
  }

  cerrarSesion() {
    this._usuarioSV.logout();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ocultarMenu(snav) {
    if (this.mobileQuery.matches) {
      snav.toggle();
    }
  }

  cambiarEmpresa(empresa) {
    this.empresa = empresa;
    this._usuarioSV.StorageEmpresa(empresa);
    this.cambioNombre(empresa);
    this._router.navigate(['/area-interna/beneficio', empresa.codigo]);
    this.ListEmpresas.ngOnDestroy();

  }

  nombreEmpresa(): string {
    if (this.mobileQuery.matches) {
      return this.nombreBtnEmpresaMobile;
    }
    return this.nombreBtnEmpresa;
  }

  cambioNombre(empresa) {
    this.nombreBtnEmpresa = String(empresa.nombre);
    this.nombreBtnEmpresaMobile = String(`Empresa Nº ${empresa.codigo}`);
    this.nombreEmpresa();
  }
}

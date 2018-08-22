import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-area-interna',
  templateUrl: './area-interna.component.html',
  styleUrls: ['./area-interna.component.scss']
})
export class AreaInternaComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  panelOpenState = false;
  menuAuxiliar = false;
  usuario: Usuario;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
     private _router: Router,
     private _usuarioSV: UsuarioService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.usuario = this._usuarioSV.usuario;
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
}

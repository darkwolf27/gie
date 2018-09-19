import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.scss']
})
export class PanelControlComponent implements OnInit {

  constructor(
    public _usuarioSV: UsuarioService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  cambiarEmpresa(empresa) {
    this._usuarioSV.StorageEmpresa(empresa);
    this._router.navigate(['/area-interna/panel-control']);
  }

}

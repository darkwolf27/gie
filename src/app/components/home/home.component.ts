import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public _usuarioSV: UsuarioService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  cambiarEmpresa(empresa) {
    this._usuarioSV.StorageEmpresa(empresa);
    this._router.navigate(['/area-interna/beneficio', empresa.codigo]);
  }

}

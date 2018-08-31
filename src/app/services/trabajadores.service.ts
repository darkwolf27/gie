import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { URL } from '../shared/config';


@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService {

  constructor(
    private _http: HttpClient,
    private _usuarioSV: UsuarioService
  ) { }

  getTrabajadoresFijos(empresa: number) {
    const token = this._usuarioSV.token;
    const url = `${URL}/trabajadoresFijos/${empresa}?token=${token}`;

    return this._http.get(url);
  }

  getTrabajadoresTemporales(empresa: number) {
    const token = this._usuarioSV.token;
    const url = `${URL}/trabajadoresTemporales/${empresa}?token=${token}`;

    return this._http.get(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../shared/config';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  constructor(
    private _http: HttpClient,
    private _usuarioSV: UsuarioService
  ) { }

  getIngresos(empresa: number, year: number) {
    const token = this._usuarioSV.token;

    const url = `${URL}/ingresos?empresa=${empresa}&year=${year}&token=${token}`;

    return this._http.get(url);
  }
}

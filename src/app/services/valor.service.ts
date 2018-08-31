import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../shared/config';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class ValorService {

  constructor(
    private _http: HttpClient,
    private _usuarioSV: UsuarioService
  ) { }

  getPatNeto(empresa: number, year: number) {
    const token = this._usuarioSV.token;

    const url = `${URL}/patNeto?empresa=${empresa}&year=${year}&token=${token}`;

    return this._http.get(url);
  }
}

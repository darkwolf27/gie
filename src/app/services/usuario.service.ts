import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../shared/config';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import {map, catchError} from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    private _http: HttpClient,
    public _router: Router
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage( token: string, usuario: Usuario ) {

    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  login(acceso) {
    const params = JSON.stringify(acceso);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post(`${URL}/login`, params, {headers})
      .pipe(
        map( (resp: any) => {
          this.guardarStorage(resp.token, resp.usuario);
          return true;
        })
    );
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this._router.navigate(['/login']);
  }

  crearUsuario( usuario: Usuario ) {

    const params = JSON.stringify(usuario);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post( `${URL}/usuario`, params, {headers} )
    .pipe(
      map( (resp: any) => {
        this.guardarStorage(resp.token, resp. usuario);
        return true;
      })
    );
  }

  cargarUsuarios() {

    return this._http.get(`${URL}/usuarios?token=${this.token}`);

  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../shared/config';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  empresa;
  mobile;
  observableEmpresa;

  constructor(
    private _http: HttpClient,
    public _router: Router
  ) {
    this.cargarStorage();
    this.observableEmpresa = new BehaviorSubject<any>(this.empresa);
  }

  eventCambioEmpresa() {
    this.observableEmpresa.next(this.empresa);
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      if (localStorage.getItem('empresa')) {
        this.empresa = JSON.parse( localStorage.getItem('empresa') );
      } else {
        this.empresa = null;
      }
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  StorageEmpresa(empresa) {
    localStorage.setItem('empresa', JSON.stringify(empresa) );
    this.empresa = empresa;
    this.eventCambioEmpresa();
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
    this.empresa = null;
    this.eventCambioEmpresa();
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('empresa');

    this._router.navigate(['/login']);
  }

  crearUsuario( usuario: Usuario ) {

    const params = JSON.stringify(usuario);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post( `${URL}/usuario`, params, {headers} );
  }

  cargarUsuarios() {
    return this._http.get(`${URL}/usuarios?token=${this.token}`);
  }

  eliminarUsuario(id) {
    return this._http.delete(`${URL}/usuario/${id}?token=${this.token}`);
  }

  cargarEmpresasUsuario(id) {
    return this._http.get(`${URL}/usuario/${id}/empresas?token=${this.token}`);
  }

  addEmpresaUsuario(id, empresa) {
    const params = JSON.stringify({
      empresa: empresa}
    );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.put( `${URL}/usuario/${id}/empresas?token=${this.token}`, params, {headers} );
  }

  deleteEmpresaUsuario(id, empresa) {
    return this._http.delete( `${URL}/usuario/${id}/${empresa}?token=${this.token}` );
  }

}

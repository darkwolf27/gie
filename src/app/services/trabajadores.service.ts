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

  altaTrabajador(trabajador, empresa, archivo: File, archivo2: File) {
    const token = this._usuarioSV.token;
    const url = `${URL}/notificacion?token=${token}`;
    const FechaAlta: Date = new Date(trabajador.fechaAlta);
    const formData: FormData = new FormData();
    formData.append('codempresa', empresa.codigo);
    formData.append('empresa', empresa.nombre);
    formData.append('nifempresa', empresa.nif);
    formData.append('nombre', trabajador.nombre);
    formData.append('apellidos', trabajador.apellidos);
    formData.append('dni', trabajador.dni);
    formData.append('contrato', trabajador.contrato);
    formData.append('jornada', trabajador.jornada);
    formData.append('categoria', trabajador.categoria);
    formData.append('fechaDia', FechaAlta.getDate().toString());
    formData.append('fechaMes', FechaAlta.getMonth().toString());
    formData.append('fechaAnio', FechaAlta.getFullYear().toString());
    if (trabajador.horas) {
      formData.append('horas', trabajador.horas);
    }
    if (trabajador.observaciones) {
      formData.append('observaciones', trabajador.observaciones);
    }
    if (archivo) {
      formData.append('archivo', archivo, archivo.name);
    }
    if (archivo2) {
      formData.append('archivo2', archivo2, archivo2.name);
    }
    return this._http.post(url, formData, {reportProgress: true});
  }
}

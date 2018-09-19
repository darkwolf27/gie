import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../shared/config';
import { UsuarioService } from './usuario.service';
import { Evento } from '../models/evento.model';
import * as moment from 'moment';
import 'moment/locale/es';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventoService {

  token;

  constructor(
    private _http: HttpClient,
    private _usuarioSV: UsuarioService
  ) {}

  AddEvento(evento: Evento) {
    const params = JSON.stringify(evento);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const url = `${URL}/evento?token=${this._usuarioSV.token}`;

    return this._http.post(url, params, {headers});
  }

  getEventos() {
    const url = `${URL}/eventos?token=${this._usuarioSV.token}`;
    return this._http.get(url).pipe(
      map(
      (resp: any) => {
        resp.eventos.forEach(evento => {
          evento.fecha = moment(evento.fecha).toDate();
        });
        return resp.eventos;
      }
    ));
  }
  getEventosMes(year: number, month: number) {
    const url = `${URL}/eventos/${year}/${month}?token=${this._usuarioSV.token}`;
    return this._http.get(url).pipe(
      map(
      (resp: any) => {
        resp.eventos.forEach(evento => {
          evento.fecha = moment(evento.fecha).toDate();
        });
        return resp.eventos;
      }
    ));
  }
}

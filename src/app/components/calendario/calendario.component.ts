import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';
import { EventoService } from '../../services/eventos.service';
import { Evento } from '../../models/evento.model';
import { CalendarioMesComponent } from '../../shared/calendario/calendario-mes.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  evento: Evento;
  eventosUser: Evento[];
  diaSeleccionado: moment.Moment;

  constructor(
    private _eventoSV: EventoService
  ) {
    this.diaSeleccionado = moment();
    this.eventosUser = [];
    this.evento = {
      fecha: moment().toDate(),
      descripcion: ''
    };
  }

  @ViewChild('calendario') private Calendario: CalendarioMesComponent;

  ngOnInit() {
    this.CargarEventosDia();
  }

  CargarEventosDia() {
    this._eventoSV.getEventos().subscribe(
      (eventos: any) => {
        this.eventosUser = eventos.filter(evento => this.diaSeleccionado.isSame(evento.fecha, 'day'));
      }
    );
  }

  cambioDia(fecha) {
    this.evento.fecha = fecha.toDate();
    this.diaSeleccionado = fecha;
    this.CargarEventosDia();
  }

  CrearEvento(descripcion) {
    this.evento.descripcion = descripcion;
    this._eventoSV.AddEvento(this.evento).subscribe(
      () => this.Calendario.generateCalendar()
    );
  }
}

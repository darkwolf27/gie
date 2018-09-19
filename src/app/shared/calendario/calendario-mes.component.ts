import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/es';
import * as _ from 'lodash';
import { EventoService } from '../../services/eventos.service';
import { Evento } from '../../models/evento.model';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
  events?: boolean;
}

interface DiaSeleccionado {
  semana: number;
  dia: number;
}

@Component({
  selector: 'app-calendario-mes',
  templateUrl: './calendario-mes.component.html',
  styleUrls: ['./calendario-mes.component.scss']
})
export class CalendarioMesComponent implements OnInit, OnChanges, OnDestroy {
  
  currentDate = moment();
  dayNames = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  diaSeleccionado: DiaSeleccionado;
  eventos: Evento[];

  @Input() selectedDates: CalendarDate[] = [];
  @Output() SelectDate = new EventEmitter<CalendarDate>();

  constructor(
    private _eventosSV: EventoService
  ) {
    this.eventos = [];
    this.diaSeleccionado = {semana: 0, dia: 0};
  }

  ngOnInit() {
    this.generateCalendar();
  }

  ngOnDestroy(): void {
    this.eventos = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
        changes.selectedDates.currentValue &&
        changes.selectedDates.currentValue.length  > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
    }
  }

  // date checkers
  isToday(date: moment.Moment, diaPos: number): boolean {
    if (moment().isSame(moment(date), 'day')) {
      let semana = 0;
      let dia = 0;
      do {
        if (diaPos > 7) {
          semana++;
        } else {
          dia = diaPos - 1;
        }
        diaPos -= 7;
      } while (diaPos > 0);

      this.diaSeleccionado = {semana, dia};

    }
    return moment().isSame(moment(date), 'day');
  }

  isEvents(date: moment.Moment) {
    const eventosDay = this.eventos.filter(event => moment(date).isSame(event.fecha, 'day'));
    return eventosDay.length > 0;
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  selectDate(date: CalendarDate, semana, dia): void {
    if (this.diaSeleccionado.semana === semana && this.diaSeleccionado.dia === dia) {
      this.diaSeleccionado = { semana: 0, dia: 0 };
    } else {
      this.weeks[this.diaSeleccionado.semana][this.diaSeleccionado.dia].selected = false;
    }
    this.weeks[semana][dia].selected = !this.weeks[semana][dia].selected;
    this.diaSeleccionado.semana = semana;
    this.diaSeleccionado.dia = dia;
    this.SelectDate.emit(date);
  }

  // actions from calendar
  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  }

  // generate the calendar grid
  generateCalendar(): void {
    this._eventosSV.getEventosMes(moment(this.currentDate).year(), moment(this.currentDate).month()).subscribe(
      events => {
        this.eventos = events;
        const dates = this.fillDates(this.currentDate);
        const weeks: CalendarDate[][] = [];
        while (dates.length > 0) {
          weeks.push(dates.splice(0, 7));
        }
        this.weeks = weeks;
        this.weeks[this.diaSeleccionado.semana][this.diaSeleccionado.dia].selected = true;
      }
    );
  }


  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    let firstDayOfGrid;
        if (firstOfMonth > 0) {
          firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth - 1, 'days');
        } else {
          firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth + 6, 'days');
        }
        const start = firstDayOfGrid.date();
        let contador = 0;
        return _.range(start, start + 42)
                .map((date: number): CalendarDate => {
                  contador++;
                  const d = moment(firstDayOfGrid).date(date);
                  return {
                    today: this.isToday(d, contador),
                    events: this.isEvents(d),
                    selected: this.isSelected(d),
                    mDate: d,
                  };
                });
  }

}

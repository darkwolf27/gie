import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GastosService } from '../../services/gastos.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {

  data;
  empresa: number;
  year: number;
  yearActual: number;
  datosCargados: boolean;
  gastosTotales: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _gastosSV: GastosService
  ) {
    this.year = new Date().getFullYear();
    this.yearActual = new Date().getFullYear();
    this.datosCargados = false;
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
      (params) => {
        this.data = [];
        this.datosCargados = false;

        if (params['empresa'] ) {
          this.empresa = Number(params['empresa']);
        }
        if (this.empresa > 0) {
          this._gastosSV.getGastos(this.empresa, this.year).subscribe(
            (resp: any) => {
              resp.data.forEach(per => {
                const periodo = {
                  'name': per.periodoNombre,
                  'value': per.resultado
                };
                this.data.push(periodo);

                this.gastosTotales = per.resAcumulado;
              });

              this.datosCargados = true;
            }
          );
        }
      }
    );
  }

  cambioEjercicio(evento) {
    this.year = evento;
    this.ngOnInit();
  }

}

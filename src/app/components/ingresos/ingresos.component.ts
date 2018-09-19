import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngresosService } from '../../services/ingresos.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss']
})
export class IngresosComponent implements OnInit {

  data;
  empresa: number;
  year: number;
  yearActual: number;
  datosCargados: boolean;
  ingresosTotales: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _ingresosSV: IngresosService
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
          this._ingresosSV.getIngresos(this.empresa, this.year).subscribe(
            (resp: any) => {
              resp.data.forEach(per => {
                const periodo = {
                  'name': per.periodoNombre,
                  'value': per.resultado
                };
                this.data.push(periodo);

                this.ingresosTotales = per.resAcumulado;
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

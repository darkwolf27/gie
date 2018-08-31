import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CostesLaboralesService } from '../../services/costes-laborales.service';

@Component({
  selector: 'app-costes-laborales',
  templateUrl: './costes-laborales.component.html',
  styleUrls: ['./costes-laborales.component.scss']
})
export class CostesLaboralesComponent implements OnInit {

  data;
  costes;
  empresa: number;
  year: number;
  yearActual: number;
  datosCargados: boolean;
  costesTotales: number;
  periodo: string;
  costesMes: number;
  Bruto: number;
  SSempresa: number;
  Indemnizaciones: number;
  OtrosGastos: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cifraNegocioSV: CostesLaboralesService
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
        this.Bruto = undefined;
        this.SSempresa = undefined;
        this.Indemnizaciones = undefined;
        this.OtrosGastos = undefined;
        this.periodo = undefined;

        if (params['empresa'] ) {
          this.empresa = Number(params['empresa']);
        }
        if (this.empresa > 0) {
          this._cifraNegocioSV.getCostesLaborales(this.empresa, this.year).subscribe(
            (resp: any) => {
              this.costes = resp.data;
              resp.data.forEach(per => {
                const periodo = {
                  'name': per.periodoMes,
                  'value': per.costes
                };
                this.data.push(periodo);

                this.costesTotales = per.costeAcumulado;
              });

              this.datosCargados = true;
            }
          );
        }
      }
    );
  }

  SelectDato(evento) {
    const periodo = this.costes.filter(mes => mes.periodoMes === evento.name)[0];
    this.periodo = periodo.periodoMes;
    this.costesMes = periodo.costes;
    this.Bruto = periodo.brutoEmpleado;
    this.SSempresa = periodo.segEmpresa;
    this.Indemnizaciones = periodo.indemnizaciones;
    this.OtrosGastos = periodo.otrosGastos;
  }

  cambioEjercicio(evento) {
    this.year = evento;
    this.ngOnInit();
  }

}

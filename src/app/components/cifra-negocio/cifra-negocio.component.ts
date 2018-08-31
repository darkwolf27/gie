import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CifraNegocioService } from '../../services/cifra-negocio.service';

@Component({
  selector: 'app-cifra-negocio',
  templateUrl: './cifra-negocio.component.html',
  styleUrls: ['./cifra-negocio.component.scss']
})
export class CifraNegocioComponent implements OnInit {

  data;
  empresa: number;
  year: number;
  yearActual: number;
  datosCargados: boolean;
  cifraTotal: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _cifraNegocioSV: CifraNegocioService
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
          this._cifraNegocioSV.getCifraNegocio(this.empresa, this.year).subscribe(
            (resp: any) => {
              resp.data.forEach(per => {
                const periodo = {
                  'name': per.periodo,
                  'value': per.resultado
                };
                this.data.push(periodo);

                this.cifraTotal = per.resAcumulado;
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

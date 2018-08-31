import { Component, OnInit } from '@angular/core';
import { ValorService } from '../../services/valor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pat-neto',
  templateUrl: './pat-neto.component.html',
  styleUrls: ['./pat-neto.component.scss']
})
export class PatNetoComponent implements OnInit {

  capital: number;
  PatNeto: number;
  datosCargados: boolean;
  year: number;
  empresa: number;


  constructor(
    private _valorSV: ValorService,
    private _activatedRoute: ActivatedRoute

  ) {
    this.year = new Date().getFullYear();
    this.datosCargados = false;
   }

  ngOnInit() {

    this._activatedRoute.params.subscribe(
      params => {
        if (params['empresa'] ) {
          this.empresa = Number(params['empresa']);
        }
        if (this.empresa <= 0 || this.empresa === NaN) {
          return;
        }

        this._valorSV.getPatNeto(this.empresa, this.year).subscribe(
          (resp: any) => {
            this.capital = resp.data.capital;
            this.PatNeto = resp.data.patNeto;
            this.datosCargados = true;
          }
        );
      }
    );
  }

}

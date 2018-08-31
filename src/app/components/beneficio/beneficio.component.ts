import { Component, OnInit } from '@angular/core';
import { BeneficioService } from '../../services/beneficio.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beneficio',
  templateUrl: './beneficio.component.html',
  styleUrls: ['./beneficio.component.scss']
})
export class BeneficioComponent implements OnInit {

  data;
  empresa: number;
  year: number = new Date().getFullYear();
  datosCargados = false;

  constructor(
    private _beneficioSV: BeneficioService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.empresa = 0;
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
          this._beneficioSV.getResultado(this.year).subscribe(
            (resp: any) => {
              resp.data.forEach(ejer => {
                const ejercicio = {
                  'name': ejer.ejercicio,
                  'value': ejer.resultado
                };
                this.data.push(ejercicio);

              });

              this.datosCargados = true;
            }
          );
        }
      }
    );
  }

}

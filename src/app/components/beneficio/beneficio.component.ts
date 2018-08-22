import { Component, OnInit } from '@angular/core';
import { BeneficioService } from '../../services/beneficio.service';

interface DatosResultado {
  CodigoEmpresa: number;
  Empresa: string;
  _GIE_nombre_contaFiscal: string;
  _giedax_email2: string;
  _GIE_ImpSocied: number;
  Resultado: number;
}

@Component({
  selector: 'app-beneficio',
  templateUrl: './beneficio.component.html',
  styleUrls: ['./beneficio.component.scss']
})
export class BeneficioComponent implements OnInit {

  data;
  empresa: number = 11;
  year: number = new Date().getFullYear();
  yearAnt: number;
  yearAnt2: number;
  resultadoAnt: number;
  resultadoAnt2: number;
  datosCargados = false;
  emailResponsable: string;

  datosResultado: DatosResultado;

  constructor(
    private _beneficioSV: BeneficioService
  ) { }

  ngOnInit() {
    this.yearAnt = this.year - 1;
    this.yearAnt2 = this.year - 2;
    this._beneficioSV.getResultado(this.empresa, this.year).subscribe((result: any) => {
      this.datosResultado = result.data;
      this._beneficioSV.getResultado(this.empresa, this.yearAnt).subscribe((resultAnt: any) => {
        this.resultadoAnt = resultAnt.data.Resultado;
        this._beneficioSV.getResultado(this.empresa, this.yearAnt2).subscribe((resultAnt2: any) => {
          this.resultadoAnt2 = resultAnt2.data.Resultado;
          this.data = [
            {
              'name': this.yearAnt2,
              'value': this.resultadoAnt2
            },
            {
              'name': this.yearAnt,
              'value': this.resultadoAnt
            },
            {
              'name': this.year,
              'value': this.datosResultado.Resultado
            }
          ];

          this.datosCargados = true;
          this.emailResponsable = 'mailto:' + this.datosResultado._giedax_email2;
        });
      });
    });
  }

}

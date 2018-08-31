import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TrabajadoresService } from '../../services/trabajadores.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

interface Trabajador {
  RazonSocialEmpleado: string;
  Dni: string;
  FechaAntiguedad: Date;
}

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.scss']
})
export class TrabajadoresComponent implements OnInit {

  empresa: number;
  trabajadoresFijos: Trabajador[];
  trabajadoresTemporales: Trabajador[];
  fuenteFijos: MatTableDataSource<Trabajador>;
  fuenteTemporales: MatTableDataSource<Trabajador>;

  constructor(
    private _trbajadoresSV: TrabajadoresService,
    private _usuarioSV: UsuarioService,
    private _activatedRoute: ActivatedRoute

  ) {
    this.empresa = 0;
    this.trabajadoresFijos = [];
    this.trabajadoresTemporales = [];
  }

  @ViewChild('SortFijos') sortFijos: MatSort;
  @ViewChild('SortTemporales') sortTemporales: MatSort;
  @ViewChild('paginatorFijos') paginatorFijos: MatPaginator;
  @ViewChild('paginatorTemporales') paginatorTemporales: MatPaginator;

  ngOnInit() {
    this._activatedRoute.params.subscribe(
      params => {

        if (params['empresa'] ) {
          this.empresa = Number(params['empresa']);
        }
        this._trbajadoresSV.getTrabajadoresFijos(this.empresa).subscribe(
          (respFijos: any) => {
            this.trabajadoresFijos = respFijos.data;
            this.fuenteFijos = new MatTableDataSource<Trabajador>(this.trabajadoresFijos);
            this.fuenteFijos.paginator = this.paginatorFijos;
            this.fuenteFijos.sort = this.sortFijos;

            this._trbajadoresSV.getTrabajadoresTemporales(this.empresa).subscribe(
              (respTemporales: any) => {
                this.trabajadoresTemporales = respTemporales.data;
                this.fuenteTemporales = new MatTableDataSource<Trabajador>(this.trabajadoresTemporales);
                this.fuenteTemporales.paginator = this.paginatorTemporales;
                this.fuenteTemporales.sort = this.sortTemporales;
              }
            );

          }
        );

      }
    );
  }

  applyFilterFijos(filterValue: string) {
    this.fuenteFijos.filter = filterValue.trim().toLowerCase();
    this.fuenteFijos.paginator = this.paginatorFijos;
    this.fuenteFijos.sort = this.sortFijos;
  }

  applyFilterTemporales(filterValue: string) {
    this.fuenteTemporales.filter = filterValue.trim().toLowerCase();
    this.fuenteTemporales.paginator = this.paginatorTemporales;
    this.fuenteTemporales.sort = this.sortTemporales;
  }

  columnasMobile() {
    if (this._usuarioSV.mobile) {
      return ['RazonSocialEmpleado'];
    }
    return ['Dni', 'RazonSocialEmpleado', 'FechaAntiguedad'];
  }


}

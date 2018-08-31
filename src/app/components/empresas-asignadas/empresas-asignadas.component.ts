import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

interface Empresa {
  codigo: number;
  nombre: string;
  nif: string;
}

@Component({
  selector: 'app-empresas-asignadas',
  templateUrl: './empresas-asignadas.component.html',
  styleUrls: ['./empresas-asignadas.component.scss']
})
export class EmpresasAsignadasComponent implements OnInit {

  empresas: Empresa[];
  fuente: MatTableDataSource<Empresa>;
  displayedColumns: string[] ;
  id: string;

  constructor(
    private _usuarioSV: UsuarioService,
    private _activatedRoute: ActivatedRoute

  ) {
    this.empresas = [];
    this.displayedColumns = ['codigo', 'nombre', 'nif', 'acciones'];
   }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this._activatedRoute.params.subscribe(

      params => {

        this.id = params['id'];

        this._usuarioSV.cargarEmpresasUsuario(this.id).subscribe(
          (resp: any) => {
            this.empresas = resp.empresas;
            this.fuente = new MatTableDataSource<Empresa>(this.empresas);
            this.fuente.paginator = this.paginator;
            this.fuente.sort = this.sort;
          }
        );
      }
    );
  }

  applyFilter(filterValue: string) {
    this.fuente.filter = filterValue.trim().toLowerCase();
    this.fuente.paginator = this.paginator;
    this.fuente.sort = this.sort;
  }

  addEmpresa(empresa) {
    this._usuarioSV.addEmpresaUsuario(this.id, empresa).subscribe(
      () => this.ngOnInit()
    );
  }

  deleteEmpresa(empresa) {
    this._usuarioSV.deleteEmpresaUsuario(this.id, empresa).subscribe(
      () => this.ngOnInit()
    );
  }

  columnasMobile() {
    if (this._usuarioSV.mobile) {
      return ['codigo', 'nombre', 'acciones'];
    }
    return ['codigo', 'nombre', 'nif', 'acciones'];
  }

}

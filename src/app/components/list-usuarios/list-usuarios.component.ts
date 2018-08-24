import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.scss']
})
export class ListUsuariosComponent implements OnInit {

  usuarios: Usuario[];
  totalUsers: number;
  fuente: MatTableDataSource<Usuario>;
  displayedColumns: string[] ;


  constructor(
    private _usuarioSV: UsuarioService
  ) {
    this.usuarios = [];
    this.totalUsers = 0;
    this.displayedColumns = ['nombre', 'email', 'acciones'];
   }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit() {
    this._usuarioSV.cargarUsuarios().subscribe( (resp: any) => {
      this.usuarios = resp.usuarios;
      this.totalUsers = resp.cuantos;
      this.fuente = new MatTableDataSource<Usuario>(this.usuarios);
      this.fuente.paginator = this.paginator;
      this.fuente.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.fuente.filter = filterValue.trim().toLowerCase();
    this.fuente.paginator = this.paginator;
    this.fuente.sort = this.sort;
  }

  columnasMobile() {
    if (this._usuarioSV.mobile) {
      return ['nombre', 'acciones'];
    }
    return ['nombre', 'email', 'acciones'];
  }

  deleteUsuario(id) {
    this._usuarioSV.eliminarUsuario(id).subscribe(
      () => this.ngOnInit()
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import {MatTableDataSource} from '@angular/material';

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

  ngOnInit() {
    this._usuarioSV.cargarUsuarios().subscribe( (resp: any) => {
      this.usuarios = resp.usuarios;
      this.totalUsers = resp.cuantos;
      this.fuente = new MatTableDataSource<Usuario>(this.usuarios);
    });
  }

}

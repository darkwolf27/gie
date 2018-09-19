import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrabajadoresService } from '../../services/trabajadores.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-trabajador-alta',
  templateUrl: './trabajador-alta.component.html',
  styleUrls: ['./trabajador-alta.component.scss']
})
export class TrabajadorAltaComponent implements OnInit {

  formTrabajador: FormGroup;
  dniDocDelantera: File;
  dniDocTrasera: File;
  trabajador;
  archivoTextoDelantera: string;
  archivoTextoTrasera: string;
  jornadaParcial: boolean;
  hideRequired: boolean;
  empresa;

  constructor(
    private _router: Router,
    private _trabajadoresSV: TrabajadoresService,
    private _usuarioSV: UsuarioService
  ) {
    this.jornadaParcial = false;
    this.hideRequired = false;
    this.empresa = _usuarioSV.empresa;
    this.formTrabajador = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'apellidos': new FormControl('', Validators.required),
      'dni': new FormControl('', Validators.required),
      'contrato': new FormControl('', Validators.required),
      'jornada': new FormControl('', Validators.required),
      'observaciones': new FormControl(),
      'categoria': new FormControl('', Validators.required),
      'fechaAlta': new FormControl('', Validators.required)
    });
   }

  @ViewChild('AltaCorrecta') private AltaCorrecta: SwalComponent;
  @ViewChild('ErrorAlta') private ErrorAlta: SwalComponent;

  ngOnInit() {
  }

  AltaTrabajador() {

    this.trabajador = this.formTrabajador.value;
    this._trabajadoresSV.altaTrabajador(this.trabajador, this.empresa, this.dniDocDelantera, this.dniDocTrasera).subscribe(
      resp => {
        this.AltaCorrecta.show();
        // console.log(resp);
      },
      error => {
        this.ErrorAlta.title = error.error.err.message;
        this.ErrorAlta.show();
      }
    );
  }

  seleccionDocumento(archivo: File, parte: number) {
    if (parte === 1) {
      this.archivoTextoDelantera = archivo.name;
      this.dniDocDelantera = archivo;
    }
    if (parte === 2) {
      this.archivoTextoTrasera = archivo.name;
      this.dniDocTrasera = archivo;
    }
  }

  cambioJornada(jornada) {
    if (jornada === 'PARCIAL') {
      if (!this.jornadaParcial) {
        this.jornadaParcial = true;
        this.formTrabajador.addControl('horas', new FormControl('', Validators.required));
      }
    } else {
      if (this.jornadaParcial) {
        this.jornadaParcial = false;
        this.formTrabajador.removeControl('horas');
      }
    }
  }


  swalOK() {
    this._router.navigate(['/area-interna/trabajadores', this.empresa.codigo]);
  }

}

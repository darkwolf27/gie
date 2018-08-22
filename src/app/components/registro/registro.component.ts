import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  form: FormGroup;
  usuario: Usuario;
  @ViewChild('UserCreated') private UserCreated: SwalComponent;
  @ViewChild('ErrorCreateUser') private ErrorCreateUser: SwalComponent;

  constructor(
    private _usuarioSV: UsuarioService,
    private _router: Router
  ) {
    this.form = new FormGroup({
      'nombre': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'password2': new FormControl('', Validators.required)
    }, { validators: this.passwordIgual('password', 'password2') });
  }

  passwordIgual( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        passwordIgual: true
      };

    };

  }

  ngOnInit() {
  }

  swalOK() {
    this._router.navigate(['/area-interna']);
  }

  register() {
    this.usuario = this.form.value;
    this._usuarioSV.crearUsuario(this.usuario)
      .subscribe(() => {
        this.UserCreated.show();
      },
      error => {
        this.ErrorCreateUser.title = error.error.err;
        this.ErrorCreateUser.show();
      }
    );
  }

}

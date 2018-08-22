import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

interface Acceso {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  acceso: Acceso;
  @ViewChild('ErrorLogin') private ErrorLogin: SwalComponent;

  constructor(
    private _usuarioSV: UsuarioService,
    private _router: Router
  ) {
    this.form = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  singIn() {
    this.acceso = this.form.value;
    this._usuarioSV.login(this.acceso)
    .subscribe(resp => {
      this._router.navigate(['/area-interna']);
      },
      error => {
        this.ErrorLogin.title = error.error.err.message;
        this.ErrorLogin.show();
      }
    );
  }

}

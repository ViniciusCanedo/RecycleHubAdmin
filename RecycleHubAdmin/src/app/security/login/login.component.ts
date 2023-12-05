import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Login!: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private builder: FormBuilder,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.Login = this.builder.group({
      email: this.builder.control('', Validators.required),
      senha: this.builder.control('', Validators.required),
    });
    const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    if (isCookieExists) {
      this.router.navigate(['/']);
    }
  }

  errorMessage = '';

  efetuarLogin() {
    const { email, senha } = this.Login.value;

    this.loginService.login(email, senha).subscribe(
      (response) => {
        if (response.message === 'Autenticação bem-sucedida') {
          this.cookieService.set('adm', response.adm);
          const empresaDataString = JSON.stringify(response.dadosEmpresa);
          this.cookieService.set('cookieEmpresa', empresaDataString);
          console.log(this.cookieService.get('cookieEmpresa'));
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Credenciais inválidas';
        }
      },
      (error) => {
        this.errorMessage = 'Senha e/ou usuário inválido(s)';
        console.error('Erro no login:', error);
      }
    );
  }

  hide = true;
}

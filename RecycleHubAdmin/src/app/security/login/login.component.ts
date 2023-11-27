import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { EmpresaService } from '../../services/empresa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  Login!: FormGroup;

  constructor(private loginService: LoginService, private router: Router, private builder: FormBuilder, private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.Login = this.builder.group({
      email: this.builder.control('', Validators.required),
      senha: this.builder.control('', Validators.required),
    });
  }

  errorMessage = '';

  efetuarLogin() {
    const { email, senha } = this.Login.value;

    this.loginService.login(email, senha).subscribe(
      response => {
        if (response.message === 'Autenticação bem-sucedida') {
          this.empresaService.salvarDadosEmpresa(response.dadosEmpresa);
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Credenciais inválidas';
        }
      },
      error => {
        this.errorMessage = 'Senha e/ou usuário inválido(s)';
        console.error('Erro no login:', error);
      }
    );
  }

  hide = true;
}

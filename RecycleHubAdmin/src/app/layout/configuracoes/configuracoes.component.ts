import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { event } from 'jquery';

import { LoginService } from '../../services/login.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css'],
})
export class ConfiguracoesComponent implements OnInit {
  Empregister!: FormGroup;
  routePath = this.route.snapshot.routeConfig?.path;
  title = this.routePath;

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private empresaService: EmpresaService
  ) {}
  isLinear = true;

  ngOnInit(): void {
    const empresaLogada = this.empresaService.obterDadosEmpresa();
    console.log('a');
    console.log(empresaLogada);

    this.Empregister = this.builder.group({
      basic: this.builder.group({
        nome: [empresaLogada?.nome || ''],
        cnpj: [empresaLogada?.cnpj || ''],
        email: [empresaLogada?.email || ''],
        senha: [empresaLogada?.senha || ''],
      }),
      contact: this.builder.group({
        telefone: [empresaLogada?.contato?.telefone || ''],
        celular: [empresaLogada?.contato?.celular || ''],
      }),
      address: this.builder.group({
        cep: [empresaLogada?.endereco?.cep || ''],
        logradouro: [empresaLogada?.endereco?.logradouro || ''],
        numero: [empresaLogada?.endereco?.numero || ''],
        bairro: [empresaLogada?.endereco?.bairro || ''],
        cidade: [empresaLogada?.endereco?.cidade || ''],
        estado: [empresaLogada?.endereco?.estado || ''],
      }),
    });
  }

  hide = true;

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  states: string[] = [
    'Acre',
    'Alagoas',
    'Amapá',
    'Amazonas',
    'Bahia',
    'Ceará',
    'Distrito Federal',
    'Espírito Santo',
    'Goiás',
    'Maranhão',
    'Mato Grosso',
    'Mato Grosso do Sul',
    'Minas Gerais',
    'Pará',
    'Paraíba',
    'Paraná',
    'Pernambuco',
    'Piauí',
    'Rio de Janeiro',
    'Rio Grande do Norte',
    'Rio Grande do Sul',
    'Rondônia',
    'Roraima',
    'Santa Catarina',
    'São Paulo',
    'Sergipe',
    'Tocantins',
  ];

  get Basicform() {
    return this.Empregister.get('basic') as FormGroup;
  }

  get Contactform() {
    return this.Empregister.get('contact') as FormGroup;
  }

  get Addressform() {
    return this.Empregister.get('address') as FormGroup;
  }

  HandleSubmit() {
    if (this.Empregister.valid) {
      console.log(this.Empregister.value);
    }
  }
}

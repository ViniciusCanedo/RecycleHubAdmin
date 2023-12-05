import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { event } from 'jquery';

import { CadastroService } from '../../services/cadastro.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css'],
})
export class ConfiguracoesComponent implements OnInit {
  Empregister!: FormGroup;
  routePath = this.route.snapshot.routeConfig?.path;
  title = '';
  botaoTexto: string = 'Enviar';
  routerUrl: string = '';

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cadastroService: CadastroService,
    private cookieService: CookieService
  ) {}
  isLinear = true;

  ngOnInit(): void {
    const empresaLogadaString = this.cookieService.get('cookieEmpresa');
    const empresaLogada: any = JSON.parse(empresaLogadaString || '{}');

    this.Empregister = this.builder.group({
      basic: this.builder.group({
        nome: [empresaLogada?.nome || ''],
        cnpj: [empresaLogada?.cnpj || ''],
        cep: [empresaLogada?.cep || ''],
        email: [empresaLogada?.email || ''],
        senha: [empresaLogada?.senha || ''],
        img: [empresaLogada?.img || ''],
      }),
      contact: this.builder.group({
        telefone: [empresaLogada?.contato?.telefone || ''],
        celular: [empresaLogada?.contato?.celular || ''],
      }),
      address: this.builder.array([]),
    });

    this.routerUrl = this.router.url;

    if (this.routerUrl === '/cadastro') {
      this.botaoTexto = 'Cadastrar';
      this.title = 'Cadastro';
    } else if (this.routerUrl === '/configuracoes') {
      const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
      if (!isCookieExists) {
        this.router.navigate(['/login']);
      }
      this.botaoTexto = 'Alterar';
      this.title = 'Configurações';
    }
  }
  efetuarCadastro() {
    const { basic, contact } = this.Empregister.value;
    const addresses = this.Empregister.get('address') as FormArray;

    const dadosEndereco = addresses.controls.map((address: any) => {
      const { cep, ...rest } = address.value;
      return rest;
    });

    const cepEmpresa = basic.cep;

    const dadosEmpresa = {
      ...basic,
      ...contact,
      endereco: dadosEndereco,
      cep: cepEmpresa,
    };

    this.cadastroService.cadastrarEmpresa(dadosEmpresa).subscribe(
      (result1: any) => {
        if (result1.status === 200 || result1.status === 201) {
          for (let i = 0; i < addresses.length; i++) {
            const address = addresses.at(i) as FormGroup; // Obtemos o FormGroup de cada índice

            const dadosEndereco = address.value;

            this.cadastroService.cadastrarEndereco(basic.cnpj, dadosEndereco).subscribe(
              (result2: any) => {
                if (result2.status === 200 || result2.status === 201) {
                  this.router.navigate(['/login']);
                }
              },
              (error: any) => {
                if (error.status === 200 || error.status === 201) {
                  this.router.navigate(['/login']);
                }
                this.router.navigate(['/login']);
              }
            );
          }
        }
      },
      (error: any) => {
        for (let i = 0; i < addresses.length; i++) {
          const address = addresses.at(i) as FormGroup; // Obtemos o FormGroup de cada índice

          const dadosEndereco = address.value;

          this.cadastroService.cadastrarEndereco(basic.cnpj, dadosEndereco).subscribe(
            (result2: any) => {
              if (result2.status === 200 || result2.status === 201) {
                this.router.navigate(['/login']);
              }
            },
            (error: any) => {
              if (error.status === 200 || error.status === 201) {
                this.router.navigate(['/login']);
              }
            }
          );
        }
      }
    );
  }

  efetuarEdicao() {}

  hide = true;

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  uf: string[] = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  get Basicform() {
    return this.Empregister.get('basic') as FormGroup;
  }

  get Contactform() {
    return this.Empregister.get('contact') as FormGroup;
  }

  get Addressform() {
    return this.Empregister.get('address') as FormArray;
  }

  HandleSubmit() {
    if (this.Empregister.valid) {
      console.log('Dados do endereço:', this.Empregister.get('address')?.value);
      if (this.routerUrl === '/cadastro') {
        this.efetuarCadastro();
      } else if (this.routerUrl === '/configuracoes') {
        this.efetuarEdicao();
      }
    }
  }

  addAddress() {
    const addressInputs = this.builder.group({
      logradouro: '',
      complemento: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
    });

    this.Addressform.push(addressInputs)
  }

  deleteAddress(addressIndex: number) {
    this.Addressform.removeAt(addressIndex);
  }
}

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
import { CadastroService } from '../../services/cadastro.service';
import { EmpresaService } from '../../services/empresa.service';

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
    private loginService: LoginService,
    private cadastroService: CadastroService,
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
        uf: [empresaLogada?.endereco?.uf || ''],
      }),
    });

    this.routerUrl = this.router.url;

    if (this.routerUrl === '/cadastro') {
      this.botaoTexto = 'Cadastrar';
      this.title = 'Cadastro';
    } else if (this.routerUrl === '/configuracoes') {
      this.botaoTexto = 'Alterar';
      this.title = 'Configurações';
    }
  }
  errorMessage = '';
  efetuarCadastro() {
    const { basic, contact, address } = this.Empregister.value;
    const { cep, ...rest } = address;

    // Criando um novo objeto sem 'cep' em 'address'
    const dadosEndereco = rest;
    const dadosEmpresa = {
      ...basic,
      ...contact,
      cep,
    };
    console.log(dadosEmpresa);
    console.log(dadosEndereco);
    console.log(basic.cnpj);
    this.cadastroService.cadastrarEmpresa(dadosEmpresa).subscribe(
      (empresaResponse) => {
        this.cadastroService
          .cadastrarEndereco(basic.cnpj, dadosEndereco)
          .subscribe(
            (enderecoResponse) => {
              // Aqui você pode lidar com a resposta do cadastro de endereço, se necessário
              this.router.navigate(['/']); // Navega para a página inicial após o cadastro bem-sucedido
            },
            (error) => {
              this.errorMessage = 'Erro ao cadastrar endereço';
            }
          );
      },
      (error) => {
        this.errorMessage = 'Erro ao cadastrar empresa';
      }
    );
    console.log(this.errorMessage);
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
    return this.Empregister.get('address') as FormGroup;
  }

  HandleSubmit() {
    if (this.Empregister.valid) {
      if (this.Empregister.valid) {
        // Enviar os dados para o backend
        if (this.routerUrl === '/cadastro') {
          this.efetuarCadastro(); // Função para cadastrar
        } else if (this.routerUrl === '/configuracoes') {
          this.efetuarEdicao(); // Função para alterar
        }
      }
    }
  }
}

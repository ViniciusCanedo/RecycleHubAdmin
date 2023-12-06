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
import { EmpresaService } from '../../services/empresa.service';
import { CookieService } from 'ngx-cookie-service';
import { Endereco } from '../../models/endereco.model';
import { forkJoin } from 'rxjs';

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
  enderecos: Endereco[] = [];
  enderecosDeletados: number[] = [];

  constructor(
    private builder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cadastroService: CadastroService,
    private empresaService: EmpresaService,
    private cookieService: CookieService
  ) {}
  isLinear = true;

  ngOnInit(): void {
    const empresaLogadaString = this.cookieService.get('cookieEmpresa');
    const empresaLogada: any = JSON.parse(empresaLogadaString || '{}');
    this.Empregister = this.builder.group({
      basic: this.builder.group({
        enderecoId: [''],
        nome: [empresaLogada?.nome || ''],
        cnpj: [empresaLogada?.cnpj || ''],
        cep: [empresaLogada?.cep || ''],
        email: [empresaLogada?.email || ''],
        senha: [empresaLogada?.senha || ''],
        imagem: [empresaLogada?.imagem || ''],
      }),
      contact: this.builder.group({
        telefone: [empresaLogada?.telefone || ''],
        celular: [empresaLogada?.celular || ''],
      }),
      address: this.builder.array([]),
    });

    this.routerUrl = this.router.url;

    this.empresaService.getEnderecosByCnpj(empresaLogada.cnpj)
      .subscribe(
        enderecos => {
          this.enderecos = enderecos;
          // Se houver endereços, preencha os campos no formulário
          if (this.enderecos.length > 0) {
            const addressesFormArray = this.Empregister.get('address') as FormArray;

            this.enderecos.forEach(endereco => {
              addressesFormArray.push(this.builder.group({
                logradouro: [endereco.logradouro],
                complemento: [endereco.complemento],
                numero: [endereco.numero],
                cidade: [endereco.cidade],
                uf: [endereco.uf],
              }));
            });
          }
        },
        error => {
          console.error('Erro ao buscar enderecos:', error);
        }
      );

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
    console.log(dadosEmpresa)
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
          this.router.navigate(['/login']);
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

  efetuarEdicao() {
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
      cep: cepEmpresa,
    };

    const empresaLogadaString = this.cookieService.get('cookieEmpresa');
    const empresaLogada: any = JSON.parse(empresaLogadaString || '{}');
    const cnpjEmpresa = basic.cnpj;

    const edicoesEnderecos = this.enderecos.map((endereco, index) => {
      const enderecoEditado = dadosEndereco[index];
      return this.empresaService.editarEndereco(endereco.id, enderecoEditado);
    });

    // Execução das edições dos endereços em paralelo
    forkJoin(edicoesEnderecos).subscribe(
      (results: any) => {
        // Ao concluir as edições dos endereços, proceder com a exclusão
        this.excluirEnderecos(cnpjEmpresa, dadosEmpresa);
      },
      (error: any) => {
        console.log('Erro ao editar endereços:', error);
        // Em caso de erro, ainda assim, prosseguir com a exclusão
        this.excluirEnderecos(cnpjEmpresa, dadosEmpresa);
      }
    );

    window.alert('Dados atualizados com sucesso');
  }

  excluirEnderecos(cnpjEmpresa: string, dadosEmpresa: any) {
    this.enderecosDeletados.forEach(enderecoId => {
      this.empresaService.excluirEndereco(this.enderecos[enderecoId].id).subscribe(
        (result: any) => {
          // Lidar com a resposta da exclusão, se necessário
        },
        (error: any) => {
          // Lidar com erros na exclusão, se necessário
        }
      );
    });

    // Após excluir os endereços, realizar a edição da empresa
    this.empresaService.editarEmpresa(cnpjEmpresa, dadosEmpresa).subscribe(
      (result: any) => {
        // Lidar com a resposta da edição da empresa
      },
      (error: any) => {
        // Lidar com erros na edição da empresa
      }
    );
  }


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
    this.addDeletedAddress(addressIndex);
  }

  addDeletedAddress(enderecoId: number) {
    this.enderecosDeletados.push(enderecoId);
  }
}

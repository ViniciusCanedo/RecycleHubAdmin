import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { MensagensComponent } from './layout/mensagens/mensagens.component';
import { AnunciosComponent } from './layout/anuncios/anuncios.component';
import { ConfiguracoesComponent } from './layout/configuracoes/configuracoes.component';
import { NovoAnuncioComponent } from './layout/novo-anuncio/novo-anuncio.component';
import { LoginComponent } from './security/login/login.component';
import { PainelComponent } from './layout/painel/painel.component';
import { EmpresasComponent } from './layout/empresas/empresas.component';
import { CategoriasComponent } from './layout/categorias/categorias.component';
import { NovaCategoriaComponent } from './layout/nova-categoria/nova-categoria.component';
import { LayoutComponent } from './layout/layout.component';
import { ModalMensagemComponent } from './modal/modal-mensagem/modal-mensagem.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'mensagens', component: MensagensComponent },
      { path: 'anuncios', component: AnunciosComponent },
      { path: 'configuracoes', component: ConfiguracoesComponent },
      { path: 'novo-anuncio', component: NovoAnuncioComponent },
      { path: 'mensagem', component: ModalMensagemComponent },
      { path: 'painel', component: PainelComponent },
      { path: 'empresas', component: EmpresasComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'nova-categoria', component: NovaCategoriaComponent },
    ],
  },
  { path: 'cadastro', component: ConfiguracoesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

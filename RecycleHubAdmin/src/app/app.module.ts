import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HeaderAdminComponent } from './layout/header-admin/header-admin.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { LoginComponent } from './security/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { MensagensComponent } from './layout/mensagens/mensagens.component';
import { AnunciosComponent } from './layout/anuncios/anuncios.component';
import { ConfiguracoesComponent } from './layout/configuracoes/configuracoes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DataTablesModule } from 'angular-datatables';
import {
  FormBuilder,
  Validators,
  FormsModule,
  FormGroup,
} from '@angular/forms';

import { NovoAnuncioComponent } from './layout/novo-anuncio/novo-anuncio.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { LayoutComponent } from './layout/layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ModalMensagemComponent } from './modal/modal-mensagem/modal-mensagem.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderAdminComponent,
    SidenavComponent,
    HomeComponent,
    MensagensComponent,
    AnunciosComponent,
    ConfiguracoesComponent,
    LoginComponent,
    NovoAnuncioComponent,
    LayoutComponent,
    ModalMensagemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,

    // Material Imports
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

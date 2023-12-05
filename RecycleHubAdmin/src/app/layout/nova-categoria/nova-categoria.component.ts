import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../../services/cadastro.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['./nova-categoria.component.css']
})
export class NovaCategoriaComponent {

  categoriaForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cadastroService: CadastroService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit(): void {
    const isCookieExists: boolean = this.cookieService.check('cookieEmpresa');
    if (!isCookieExists) {
      this.router.navigate(['/login']);
    }
    this.categoriaForm = this.formBuilder.group({
      nome: ['', Validators.required]
    });
  }

  cadastrarCategoria() {
    if (this.categoriaForm.valid) {
      const categoriaData = this.categoriaForm.value;
      console.log(categoriaData)
      this.cadastroService.cadastrarCategoria(categoriaData)
        .subscribe(
          (response) => {
            this.router.navigate(['/categorias']);
          },
          (error) => {
            if (error.status === 200 || error.status === 201) {
              this.router.navigate(['/categorias']);
            }
          }
        );
      this.categoriaForm.reset();
    }
  }
}

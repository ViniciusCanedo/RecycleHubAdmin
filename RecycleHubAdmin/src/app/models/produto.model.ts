import { Empresa } from './empresa.model';
import { Categoria } from './categoria.model';
export interface Produto {
    id: number;
    nome: string;
    preco: number;
    unidadeMedida: string;
    descricao: string;
    status: string;
    imagem: string;
    visualizacoes: number;
    empresa: Empresa;
    categoria: Categoria;
  }

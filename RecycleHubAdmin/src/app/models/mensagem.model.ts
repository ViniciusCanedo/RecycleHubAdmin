import { Produto } from './produto.model';
export interface Mensagem {
    id: number;
    email: string;
    nome: string;
    conteudo: string;
    telefone: string;
    status: string;
    produto: Produto;
  }

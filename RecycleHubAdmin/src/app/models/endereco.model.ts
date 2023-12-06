import { Empresa } from './empresa.model';
export interface Endereco {
  id: number;
  uf: string;
  cidade: string;
  logradouro: string;
  complemento: string;
  numero: string;
  empresa: Empresa;
}

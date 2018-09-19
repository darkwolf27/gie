import { Empresa } from '../components/empresas-asignadas/empresas-asignadas.component';
export interface Usuario {
    nombre: string;
    email: string;
    img?: string;
    role?: string;
    _id?: string;
    estado?: string;
    empresas?: Empresa[];

}

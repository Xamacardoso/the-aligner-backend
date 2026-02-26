// Campos para cadastro 
// • CPF/CNPJ Parceiro 
// • Razao Social/Nome do Parceiro 
// • CPF do Paciente 
// • Nome do Paciente 
// • Data de nascimento 
// • Descricao da queixa principal do paciente 
// • Descricao das observações do parceiro sobre o caso 
// • Descricao dos objetivos do tratamento 
// • Objetivos do tratamento (2 opcoes por categoria - manter / corrigir) 
// o Linha média supeiror 
// o Linha média inferior 
// o Overjet 
// o Overbite 
// o Forma do arco superior 
// o Forma do arco inferior 
// • Apinhamento (3 Escolhas por categoria - Projetar/expandir; Inclinar ;IPR 
// (desgaste interproximal)) 
// o Superior anterior 
// o Superior posterior 
// o Inferior anterior 
// o Inferior posterior 
// • Outras observaçoes julgadas como importantes

import { IsDateString, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";

export class CreatePatientDto {

    @IsString()
    @IsNotEmpty()
    @Length(11, 11)
    cpfParceiro: string;

    @IsString()
    @IsOptional()
    @Length(14, 14)
    cnpjParceiro: string;

    @IsString()
    @IsNotEmpty()
    @Length(11, 11)
    cpfPaciente: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(45)
    nomePaciente: string;

    @IsDateString()
    @IsOptional()
    dataNascimento: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    descricaoQueixaPrincipal: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    descricaoObservacoes: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    descricaoObjetivosTratamento: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    objetivosTratamento: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    apinhamento: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    outrasObservacoes: string;
}

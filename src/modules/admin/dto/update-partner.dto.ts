import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class UpdatePartnerDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @IsOptional()
    senha?: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    cro: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 2)
    croUf: string;

    // TODO: Mudar para string para aceitar "Ortodontia" etc
    @IsNumber()
    @IsOptional()
    especialidadeId: number;

    // TODO: Mudar para string para aceitar "Doutor" etc
    @IsNumber()
    @IsOptional()
    titulacaoId: number;

    @IsString()
    @IsOptional()
    @MaxLength(11)
    telefone: string;

    @IsString()
    @IsOptional()
    @MaxLength(14)
    cnpj: string;

    @IsString()
    @IsOptional()
    razaoSocial: string;

    @IsString()
    @IsOptional()
    @MaxLength(11)
    telefone_estabelecimento: string;

    @IsString()
    @IsOptional()
    complemento: string;

    @IsString()
    @IsOptional()
    @MaxLength(8)
    cep: string;

    @IsString()
    @IsOptional()
    bairro: string;

    @IsString()
    @IsOptional()
    cidade: string;

    @IsString()
    @IsOptional()
    @MaxLength(2)
    uf_estabelecimento: string;

    @IsString()
    @IsOptional()
    endereco: string;
}

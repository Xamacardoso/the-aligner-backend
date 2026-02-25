import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreatePartnerDto {
    @IsString()
    @IsNotEmpty()
    @Length(11, 11)
    cpf: string;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    senha: string;

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
    @Length(10, 11)
    telefone: string;

    @IsString()
    @IsOptional()
    @Length(14, 14)
    cnpj: string;

    @IsString()
    @IsOptional()
    razaoSocial: string;

    @IsString()
    @IsOptional()
    @Length(10, 11)
    telefone_estabelecimento: string;

    @IsString()
    @IsOptional()
    complemento: string;

    @IsString()
    @IsOptional()
    @Length(8, 8)
    cep: string;

    @IsString()
    @IsOptional()
    bairro: string;

    @IsString()
    @IsOptional()
    cidade: string;

    @IsString()
    @IsOptional()
    @Length(2, 2)
    uf_estabelecimento: string;

    @IsString()
    @IsOptional()
    endereco: string;
}

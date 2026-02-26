import { IsString, IsNotEmpty, IsNumber, IsOptional, Length, MaxLength } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  pacienteCpf: string;

  @IsNumber()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  descricao: string;
}

export class UpdateBudgetDto {
  @IsOptional()
  @IsNumber()
  valor?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  descricao?: string;
}
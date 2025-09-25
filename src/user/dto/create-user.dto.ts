import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  MinLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  full_name: string;

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsOptional()
  @IsDateString({}, { message: 'A data de nascimento deve ser válida (YYYY-MM-DD).' })
  birthdate?: string;

  @ApiProperty({ example: '123.456.789-00', required: false })
  @IsNotEmpty({ message: 'O CPF é obrigatório.'})
  @IsString({ message: 'O CPF deve ser uma string.' })
  cpf: string;

  @ApiProperty({ example: 'Rua das Flores', required: false })
  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  @IsString({ message: 'O endereço deve ser uma string.' })
  address_street: string;

  @ApiProperty({ example: '123', required: false })
  @IsNotEmpty({ message: 'O número da casa é obrigatório.' })
  @IsString({ message: 'O número da casa deve ser uma string.' })
  address_number: string;

  @ApiProperty({ example: 'Centro', required: false })
  @IsNotEmpty({ message: 'O bairro é obrigatório.' })
  @IsString({ message: 'O bairro deve ser uma string.' })
  address_neighborhood: string;

  @ApiProperty({ example: '12345-678', required: false })
  @IsNotEmpty({ message: 'O CEP é obrigatório.' })
  @IsString({ message: 'O CEP deve ser uma string.' })
  address_zipcode: string;

  @ApiProperty({ example: 'Apartamento 101', required: false })
  @IsOptional()
  @IsString({ message: 'O complemento deve ser uma string.' })
  address_complement?: string;

  @ApiProperty({ example: 'Cascavel', required: false })
  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  @IsString({ message: 'A cidade deve ser uma string.' })
   @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return value;
  })
  address_city: string;

  @ApiProperty({ example: 'CE', required: false })
  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  @IsString({ message: 'O estado deve ser uma string.' })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toUpperCase().substring(0, 2);
    }
    return value;
  })
  address_state: string;

  @ApiProperty({ example: '(11) 91234-5678', required: false })
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @IsString({ message: 'O telefone deve ser uma string.' })
  phone: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  @IsNotEmpty({ message: 'O e-mail é obrigatório '})
  @IsEmail({}, { message: 'O e-mail deve ser válido.' })
  email: string;

  @ApiProperty({ example: true, required: false })
  @IsNotEmpty({ message: 'O campo is_active é obrigatório' })
  @IsBoolean({ message: 'O campo is_active deve ser booleano.' })
  is_active: boolean;
}

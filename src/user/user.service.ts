import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidationService } from './helpers/user-validation.helper';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly userValidation: UserValidationService,
  ) { }

  async create(data: CreateUserDto) {
    try {
      const password = process.env.GENERIC_PASSWORD;
      if (!password) {
        throw new BadRequestException('A senha genérica para novos usuários não está definida nas variáveis de ambiente.');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = await this.prisma.users.create({
        data: {
          ...data,
          password: hashedPassword,
          role: 'admin',
        }
      });

      return {
        data: newUser,
        errorMessages: [],
      };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return {
        data: null,
        errorMessages: [error.message],
      };
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.users.findMany(
        { where: { role: { not: 'admin' }  } }
      );
      return {
        data: users,
        errorMessages: [],
      };
    } catch (error) {
      return {
        data: null,
        errorMessages: [error.message],
      };
    }
  }

  async findOne(id: number) {
    const errorMessages: string[] = [];

    const userExists = await this.userValidation.validateUserExistsById(id);
    if (userExists) errorMessages.push(userExists.message);

    if (errorMessages.length > 0) {
      throw new NotFoundException({
        data: null,
        errorMessages
      })
    }

    const user = await this.prisma.users.findUnique({ 
      where: { id },
     });

    return { data: user, errorMessages }
  }

  async findMe(id: number){
    const errorMessages: string[] = [];

    const userExists = await this.userValidation.validateUserExistsById(id);
    if (userExists) errorMessages.push(userExists.message);

     if (errorMessages.length > 0) {
      throw new NotFoundException({
        data: null,
        errorMessages
      })
    }

     const user = await this.prisma.users.findUnique({ 
      where: { id },
      select:{
        id: true,
        full_name: true,
        email: true
      },
     });

    return { data: user, errorMessages }
  }

  async remove(id: number) {
    const errorMessages: string[] = [];

    const userExists = await this.userValidation.validateUserExistsById(id);
    
    if (errorMessages.length > 0) {
      throw new NotFoundException({
        data: null,
        errorMessages
      })
    }

    const user = await this.prisma.users.delete({ where: { id } });

    return { data: user, errorMessages }
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email } });
  }

  async updateRefreshToken(id: number, refreshToken: string | null) {
    return this.prisma.users.update({
      where: { id },
      data: { refreshToken },
    });
  }

  async findOneForAuth(id: number) {
    return this.prisma.users.findUnique({ where: { id } });
  }
}

import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request, Req, Query, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateDriverDto } from './dto/create-driver.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}

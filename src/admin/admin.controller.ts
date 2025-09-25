import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request, Req, Query, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiConflictResponse, ApiOperation, ApiQuery, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
 export class AdminController {
   constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('user')
    @ApiOperation({ summary: 'Create a new user with a generic password' })
    @ApiResponse({ status: 201, description: 'User created successfully.' })
    @ApiBadRequestResponse({ description: 'Bad Request.' })
    @ApiConflictResponse({ description: 'Conflict. Email already in use.' })
    async createUser(@Body() createUserDto: CreateUserDto) {
      const result = await this.userService.create(createUserDto);
      if (result.errorMessages.length > 0) {
        throw new BadRequestException(result.errorMessages);
      }
      return result.data;
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('users')
    @ApiOperation({ summary: 'Retrieve all users' })
    @ApiResponse({ status: 200, description: 'List of users retrieved successfully.' })
    @ApiBadRequestResponse({ description: 'Bad Request.' })
    async getAllUsers() {
      return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('user/:id')
    @ApiOperation({ summary: 'Retrieve a user by ID' })
    @ApiResponse({ status: 200, description: 'User retrieved successfully.' })
    @ApiNotFoundResponse({ description: 'User not found.' })
    @ApiBadRequestResponse({ description: 'Bad Request.' })
    async getUserById(@Param('id') id: string) {
      const userId = parseInt(id, 10);
      if (isNaN(userId)) {
        throw new BadRequestException('Invalid user ID.');
      }
      const result = await this.userService.findOne(userId);
      if (result.errorMessages.length > 0) {
        throw new BadRequestException(result.errorMessages);
      }
      return result.data;
    }
}
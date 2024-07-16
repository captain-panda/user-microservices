import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  AuthGuard,
  CreateUserRequest,
  GenericResponse,
  GetUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '@app/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  healthCheck(): string {
    return this.userService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get('getUserByUserName')
  async getUserByUserName(
    @Req() req,
    @Body() body: GetUserRequest,
  ): Promise<UserResponse> {
    return this.userService.getUserByUserName(req.userId, body.username);
  }

  @UseGuards(AuthGuard)
  @Post('updateUser')
  async updateUser(
    @Req() req,
    @Body() body: UpdateUserRequest,
  ): Promise<UserResponse> {
    return this.userService.updateUser(req.userId, body);
  }

  @UseGuards(AuthGuard)
  @Post('deleteUser')
  async deleteUser(@Req() req): Promise<GenericResponse> {
    return this.userService.deleteUser(req.userId);
  }

  @Post('createUser')
  async createUser(@Body() body: CreateUserRequest): Promise<UserResponse> {
    return this.userService.createUser(body);
  }
}

import {
  UserResponse,
  UserRepository,
  GET_USER_ERROR,
  GET_USER_SUCCESS,
  USER_NOT_FOUND,
  UNAUTHORIZED,
  GET_BLOCKED_USER_ABORTED,
  UpdateUserRequest,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  GenericResponse,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  CreateUserRequest,
  USERNAME_UNAVAILABLE,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
  MultipleUserResponse,
} from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUserByUserName(
    userId: string,
    username: string,
  ): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        return UserResponse.error(UNAUTHORIZED);
      }
      const response = await this.userRepository.findUserByUsername(username);
      if (!response) {
        return UserResponse.error(USER_NOT_FOUND);
      }
      const isBlocked = user.blockedUsers.includes(response._id);
      if (isBlocked) {
        return UserResponse.error(GET_BLOCKED_USER_ABORTED);
      }
      return UserResponse.success(GET_USER_SUCCESS, response);
    } catch (err) {
      console.log(
        `UserService.getUserByUserName - Err : ${JSON.stringify(err)}`,
      );
      return UserResponse.error(GET_USER_ERROR);
    }
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserRequest,
  ): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        return UserResponse.error(USER_NOT_FOUND);
      }
      const updatedUser = await this.userRepository.updateUser(
        userId,
        updateUserDto.name,
        updateUserDto.surname,
        updateUserDto.birthdate,
      );
      if (!updatedUser) {
        return UserResponse.error(UPDATE_USER_ERROR);
      }
      return UserResponse.success(UPDATE_USER_SUCCESS, updatedUser);
    } catch (err) {
      console.log(`UserService.updateUser - Err : ${JSON.stringify(err)}`);
      return UserResponse.error(UPDATE_USER_ERROR);
    }
  }

  async deleteUser(userId: string): Promise<GenericResponse> {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        return UserResponse.error(USER_NOT_FOUND);
      }
      await this.userRepository.markUserAsDeleted(userId);
      return GenericResponse.success(DELETE_USER_SUCCESS);
    } catch (err) {
      console.log(`UserService.deleteUser - Err : ${JSON.stringify(err)}`);
      return UserResponse.error(DELETE_USER_ERROR);
    }
  }

  async createUser(createUserDto: CreateUserRequest): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findUserByUsername(
        createUserDto.username,
      );
      if (user) {
        return UserResponse.error(USERNAME_UNAVAILABLE);
      }
      const createdUser = await this.userRepository.createUser(createUserDto);
      return UserResponse.success(CREATE_USER_SUCCESS, createdUser);
    } catch (err) {
      console.log(`UserService.createUser - Err : ${JSON.stringify(err)}`);
      return UserResponse.error(CREATE_USER_ERROR);
    }
  }

  async getUsers(userId: string): Promise<MultipleUserResponse> {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        return MultipleUserResponse.error(UNAUTHORIZED);
      }
      const response = await this.userRepository.findUnblockedUsers(
        user.blockedUsers,
      );
      return MultipleUserResponse.success(GET_USER_SUCCESS, response);
    } catch (err) {
      console.log(`UserService.getUsers - Err : ${JSON.stringify(err)}`);
      return MultipleUserResponse.error(GET_USER_ERROR);
    }
  }
}

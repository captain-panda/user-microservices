import { InjectModel } from '@nestjs/mongoose';
import { CreateUserRequest, User } from '../models';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findUserByUsername(username: string): Promise<User> {
    try {
      return this.userModel
        .findOne({
          username: username,
        })
        .lean();
    } catch (err) {
      console.log(
        `UserRepository.findUserByUsername - Err : ${JSON.stringify(err)}`,
      );
      throw err;
    }
  }

  async findUserById(userId: string): Promise<User> {
    try {
      return this.userModel
        .findOne({
          _id: new Types.ObjectId(userId),
        })
        .lean();
    } catch (err) {
      console.log(`UserRepository.findUserById - Err : ${JSON.stringify(err)}`);
      throw err;
    }
  }

  async updateUser(
    userId: string,
    name?: string,
    surname?: string,
    birthdate?: Date,
  ): Promise<User> {
    try {
      const updates = {};
      if (name) updates['name'] = name;
      if (surname) updates['surname'] = surname;
      if (birthdate) updates['birthdate'] = birthdate;
      return this.userModel
        .updateOne(
          {
            _id: new Types.ObjectId(userId),
          },
          updates,
        )
        .lean();
    } catch (err) {
      console.log(`UserRepository.updateUser - Err : ${JSON.stringify(err)}`);
      throw err;
    }
  }

  async markUserAsDeleted(userId: string) {
    try {
      return this.userModel
        .updateOne(
          {
            _id: new Types.ObjectId(userId),
          },
          {
            isActive: false,
          },
        )
        .lean();
    } catch (err) {
      console.log(
        `UserRepository.markUserAsDeleted - Err : ${JSON.stringify(err)}`,
      );
      throw err;
    }
  }

  async createUser(createUserDto: CreateUserRequest): Promise<User> {
    try {
      return this.userModel.create(createUserDto);
    } catch (err) {
      console.log(`UserRepository.createUser - Err : ${JSON.stringify(err)}`);
      throw err;
    }
  }

  async blockUser(userId: string, userToBlock: Types.ObjectId) {
    try {
      return this.userModel.updateOne(
        {
          _id: new Types.ObjectId(userId),
        },
        {
          $push: { blockedUsers: userToBlock },
        },
      );
    } catch (err) {
      console.log(`UserRepository.blockUser - Err : ${JSON.stringify(err)}`);
      throw err;
    }
  }

  async unblockUser(userId: string, userToUnBlock: Types.ObjectId) {
    try {
      return this.userModel.updateOne(
        {
          _id: new Types.ObjectId(userId),
        },
        {
          $pull: { blockedUsers: userToUnBlock },
        },
      );
    } catch (err) {
      console.log(`UserRepository.unblockUser - Err : ${JSON.stringify(err)}`);
      throw err;
    }
  }

  async findUnblockedUsers(blockedIds: Types.ObjectId[]): Promise<Array<User>> {
    try {
      return this.userModel
        .find({
          _id: { $nin: blockedIds },
        })
        .lean();
    } catch (err) {
      console.log(
        `UserRepository.findUnblockedUsers - Err : ${JSON.stringify(err)}`,
      );
      throw err;
    }
  }
}

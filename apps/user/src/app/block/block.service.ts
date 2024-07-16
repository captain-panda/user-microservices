import {
  BLOCK_USER_ERROR,
  BLOCK_USER_SUCCESS,
  GenericResponse,
  UNAUTHORIZED,
  UNBLOCK_USER_ERROR,
  UNBLOCK_USER_SUCCESS,
  USER_NOT_FOUND,
  UserRepository,
} from '@app/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlockService {
  constructor(private readonly userRepository: UserRepository) {}

  async blockUser(
    userId: string,
    usernameToBlock: string,
  ): Promise<GenericResponse> {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        return GenericResponse.error(UNAUTHORIZED);
      }
      const userToBlock =
        await this.userRepository.findUserByUsername(usernameToBlock);
      if (!userToBlock) {
        return GenericResponse.error(USER_NOT_FOUND);
      }
      await this.userRepository.blockUser(userId, userToBlock._id);
      return GenericResponse.success(BLOCK_USER_SUCCESS);
    } catch (err) {
      console.log(`BlockService.blockUser - Err : ${JSON.stringify(err)}`);
      return GenericResponse.error(BLOCK_USER_ERROR);
    }
  }

  async unblockUser(
    userId: string,
    usernameToUnBlock: string,
  ): Promise<GenericResponse> {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        return GenericResponse.error(UNAUTHORIZED);
      }
      const userToUnBlock =
        await this.userRepository.findUserByUsername(usernameToUnBlock);
      if (!userToUnBlock) {
        return GenericResponse.error(USER_NOT_FOUND);
      }
      await this.userRepository.unblockUser(userId, userToUnBlock._id);
      return GenericResponse.success(UNBLOCK_USER_SUCCESS);
    } catch (err) {
      console.log(`BlockService.blockUser - Err : ${JSON.stringify(err)}`);
      return GenericResponse.error(UNBLOCK_USER_ERROR);
    }
  }
}

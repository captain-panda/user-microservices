import { Model, Types } from 'mongoose';
import { UserRepository } from './user.repository';
import { User } from '../models';
import { TestBed } from '@automock/jest';
import { getModelToken } from '@nestjs/mongoose';

const ACTIVE_USER_MOCK: User = {
  _id: new Types.ObjectId('6696e83ba8115127510a1d8e'),
  name: 'string',
  surname: 'string',
  username: 'string',
  birthdate: new Date('2023-01-21T08:32:40.364Z'),
  blockedUsers: [new Types.ObjectId('6696e8c3fdc6a78a0bc5c1b0')],
  isActive: true,
};
const UPDATE_RESULT = {
  acknowledged: true,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0,
};

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userModel: jest.Mocked<Model<User>>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(UserRepository)
      .mock(getModelToken(User.name))
      .using({
        findOne: jest.fn(),
        find: jest.fn(),
        updateOne: jest.fn(),
        create: jest.fn(),
      })
      .compile();
    userRepository = unit;
    userModel = unitRef.get(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should be object', () => {
    expect(typeof userRepository).toBe('object');
  });

  describe('findUserByUsername', () => {
    it('should be defined', () => {
      expect(userRepository.findUserByUsername).toBeDefined();
    });

    it('should be function', () => {
      expect(typeof userRepository.findUserByUsername).toBe('function');
    });

    it('should throw error if occured', async () => {
      userModel.findOne.mockReturnValue({
        lean: jest.fn().mockRejectedValue(new Error('Sample error')),
      } as any);

      try {
        await userRepository.findUserByUsername('sample');
      } catch (err) {
        const error = err as Error;
        expect(error.message).toBe('Sample error');
      }
    });

    it('should return user by username', async () => {
      userModel.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(ACTIVE_USER_MOCK),
      } as any);
      const result = await userRepository.findUserByUsername('string');
      expect(result).toMatchObject(ACTIVE_USER_MOCK);
    });
  });

  describe('findUserById', () => {
    it('should be defined', () => {
      expect(userRepository.findUserById).toBeDefined();
    });

    it('should be function', () => {
      expect(typeof userRepository.findUserById).toBe('function');
    });

    it('should throw error if occured', async () => {
      userModel.findOne.mockReturnValue({
        lean: jest.fn().mockRejectedValue(new Error('Sample error')),
      } as any);

      try {
        await userRepository.findUserById('6696e83ba8115127510a1d8e');
      } catch (err) {
        const error = err as Error;
        expect(error.message).toBe('Sample error');
      }
    });

    it('should return user by id', async () => {
      userModel.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(ACTIVE_USER_MOCK),
      } as any);
      const result = await userRepository.findUserById(
        '6696e83ba8115127510a1d8e',
      );
      expect(result).toMatchObject(ACTIVE_USER_MOCK);
    });
  });

  describe('updateUser', () => {
    it('should be defined', () => {
      expect(userRepository.updateUser).toBeDefined();
    });

    it('should be function', () => {
      expect(typeof userRepository.updateUser).toBe('function');
    });

    it('should throw error if occured', async () => {
      userModel.updateOne.mockReturnValue({
        lean: jest.fn().mockRejectedValue(new Error('Sample error')),
      } as any);

      try {
        await userRepository.updateUser('6696e83ba8115127510a1d8e');
      } catch (err) {
        const error = err as Error;
        expect(error.message).toBe('Sample error');
      }
    });

    it('should update the user', async () => {
      userModel.updateOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(UPDATE_RESULT),
      } as any);
      userModel.findOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(ACTIVE_USER_MOCK),
      } as any);
      const result = await userRepository.updateUser(
        '6696e83ba8115127510a1d8e',
        'string',
        'string',
        new Date(),
      );
      expect(result).toMatchObject(ACTIVE_USER_MOCK);
    });
  });

  describe('markUserAsDeleted', () => {
    it('should be defined', () => {
      expect(userRepository.markUserAsDeleted).toBeDefined();
    });

    it('should be function', () => {
      expect(typeof userRepository.markUserAsDeleted).toBe('function');
    });

    it('should throw error if occured', async () => {
      userModel.updateOne.mockReturnValue({
        lean: jest.fn().mockRejectedValue(new Error('Sample error')),
      } as any);

      try {
        await userRepository.markUserAsDeleted('6696e83ba8115127510a1d8e');
      } catch (err) {
        const error = err as Error;
        expect(error.message).toBe('Sample error');
      }
    });

    it('should mark the user as deleted', async () => {
      userModel.updateOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(UPDATE_RESULT),
      } as any);
      const result = await userRepository.markUserAsDeleted(
        '6696e83ba8115127510a1d8e',
      );
      expect(result).toMatchObject(UPDATE_RESULT);
      expect(result.modifiedCount).toBe(1);
    });
  });

  describe('createUser', () => {
    it('should be defined', () => {
      expect(userRepository.createUser).toBeDefined();
    });

    it('should be function', () => {
      expect(typeof userRepository.createUser).toBe('function');
    });

    it('should throw error if occured', async () => {
      userModel.create.mockRejectedValue(new Error('Sample error'));

      try {
        await userRepository.createUser({
          name: 'string',
          surname: 'string',
          username: 'string',
          birthdate: new Date('2023-01-21T08:32:40.364Z'),
        });
      } catch (err) {
        const error = err as Error;
        expect(error.message).toBe('Sample error');
      }
    });
  });

  describe('blockUser', () => {
    it('should be defined', () => {
      expect(userRepository.blockUser).toBeDefined();
    });

    it('should be function', () => {
      expect(typeof userRepository.blockUser).toBe('function');
    });

    it('should throw error if occured', async () => {
      userModel.updateOne.mockRejectedValue(new Error('Sample error'));

      try {
        await userRepository.blockUser(
          '6696e83ba8115127510a1d8e',
          new Types.ObjectId('6696e8c3fdc6a78a0bc5c1b0'),
        );
      } catch (err) {
        const error = err as Error;
        expect(error.message).toBe('Sample error');
      }
    });

    it('should block entered users', async () => {
      userModel.updateOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(UPDATE_RESULT),
      } as any);
      const result = await userRepository.blockUser(
        '6696e83ba8115127510a1d8e',
        new Types.ObjectId('6696e8c3fdc6a78a0bc5c1b0'),
      );
      expect(result).toMatchObject(UPDATE_RESULT);
      expect(result.modifiedCount).toBe(1);
    });
  });

  describe('unblockUser', () => {
    it('should be defined', () => {
      expect(userRepository.unblockUser).toBeDefined();
    });

    it('should be function', () => {
      expect(typeof userRepository.unblockUser).toBe('function');
    });

    it('should throw error if occured', async () => {
      userModel.updateOne.mockRejectedValue(new Error('Sample error'));

      try {
        await userRepository.unblockUser(
          '6696e83ba8115127510a1d8e',
          new Types.ObjectId('6696e8c3fdc6a78a0bc5c1b0'),
        );
      } catch (err) {
        const error = err as Error;
        expect(error.message).toBe('Sample error');
      }
    });

    it('should un-block entered users', async () => {
      userModel.updateOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue(UPDATE_RESULT),
      } as any);
      const result = await userRepository.unblockUser(
        '6696e83ba8115127510a1d8e',
        new Types.ObjectId('6696e8c3fdc6a78a0bc5c1b0'),
      );
      expect(result).toMatchObject(UPDATE_RESULT);
      expect(result.modifiedCount).toBe(1);
    });
  });

  describe('findUnblockedUsers', () => {
    it('should be defined', () => {
      expect(userRepository.findUnblockedUsers).toBeDefined();
    });

    it('should be function', () => {
      expect(typeof userRepository.findUnblockedUsers).toBe('function');
    });

    it('should throw error if occured', async () => {
      userModel.find.mockRejectedValue(new Error('Sample error'));

      try {
        await userRepository.findUnblockedUsers([
          new Types.ObjectId('6696e8c3fdc6a78a0bc5c1b0'),
        ]);
      } catch (err) {
        const error = err as Error;
        expect(error.message).toBe('Sample error');
      }
    });

    it('should un-block entered users', async () => {
      userModel.updateOne.mockReturnValue({
        lean: jest.fn().mockResolvedValue([ACTIVE_USER_MOCK]),
      } as any);
      const result = await userRepository.findUnblockedUsers([
        new Types.ObjectId('6696e8c3fdc6a78a0bc5c1b0'),
      ]);
      expect(result).toMatchObject([ACTIVE_USER_MOCK]);
      expect(result.length).toBe(1);
    });
  });
});

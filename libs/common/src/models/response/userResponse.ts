import { User } from '../user';
import { GenericResponse } from './genericResponse';

export class UserResponse extends GenericResponse {
  data?: User;

  constructor(appStatus: string, data: User) {
    super(appStatus);
    this.data = data;
  }

  static success(appStatus: string, data?: User): UserResponse {
    return new this(appStatus, data);
  }

  static error(appStatus: string, data?: User): UserResponse {
    return new this(appStatus, data);
  }
}

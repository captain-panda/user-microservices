import { User } from '../user';
import { GenericResponse } from './genericResponse';

export class MultipleUserResponse extends GenericResponse {
  data?: Array<User>;

  constructor(appStatus: string, data: User[]) {
    super(appStatus);
    this.data = data;
  }

  static success(appStatus: string, data?: User[]): MultipleUserResponse {
    return new this(appStatus, data);
  }

  static error(appStatus: string, data?: User[]): MultipleUserResponse {
    return new this(appStatus, data);
  }
}

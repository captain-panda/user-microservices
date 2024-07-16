import { Injectable } from '@nestjs/common';

@Injectable()
export class BlockService {
  getHello(): string {
    return 'Hello World!';
  }
}

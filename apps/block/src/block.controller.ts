import { Controller, Get } from '@nestjs/common';
import { BlockService } from './block.service';

@Controller()
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Get()
  getHello(): string {
    return this.blockService.getHello();
  }
}

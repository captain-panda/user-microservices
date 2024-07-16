import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BlockService } from './block.service';
import {
  AuthGuard,
  ToggleUserBlockRequest,
  GenericResponse,
} from '@app/common';

@Controller()
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @UseGuards(AuthGuard)
  @Post('blockUser')
  async blockUser(
    @Req() req,
    @Body() body: ToggleUserBlockRequest,
  ): Promise<GenericResponse> {
    return this.blockService.blockUser(req.userId, body.username);
  }

  @UseGuards(AuthGuard)
  @Post('unblockUser')
  async unblockUser(
    @Req() req,
    @Body() body: ToggleUserBlockRequest,
  ): Promise<GenericResponse> {
    return this.blockService.unblockUser(req.userId, body.username);
  }
}

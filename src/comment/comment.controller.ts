import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Get,
  Param,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentService } from '@comment/comment.service';
import { CreateCommentDto } from '@comment/dto/create-comment.dto';
import { RequestWithUserInterface } from '@auth/interfaces/requestWithUser.interface';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  @ApiBody({ type: CreateCommentDto })
  @ApiOperation({ summary: '댓글등록', description: '댓글 등록해주는 api' })
  @ApiResponse({
    description: 'create comment',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Req() req: RequestWithUserInterface,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentService.createComment(createCommentDto, req.user);
  }

  @Get(':id')
  async getCommentById(@Param('id') id: string) {
    const comment = await this.commentService.commentGeyById(id);
    return comment;
  }
}

import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Req() req: RequestWithUserInterface,
    @Body() createCommentDto: CreateCommentDto,
  ) {}
}

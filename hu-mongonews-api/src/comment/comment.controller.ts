import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.schema';
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: Comment) {
    return this.commentService.create(createCommentDto);
  }
  @Post('createSubComment')
  createSubComment(@Body() createCommentDto: Comment) {
    return this.commentService.createSubComment(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }
  @Get('commentsForArticles/:id')
  commentsForArticles(@Param('id')id:string)
  {
    return this.commentService.getCommentForArticle(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: Comment) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}

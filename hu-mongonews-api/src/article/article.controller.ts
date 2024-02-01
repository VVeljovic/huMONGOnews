import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.schema';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticleDto: Partial<Article>) {
    return await this.articleService.create(createArticleDto);
  }

  @Get()
  async findAll() {
    return await this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(id);
  }

  @Get('byTitle/:title')
  async findOneByTitle(@Param('title') title: string) {
    return await this.articleService.findOneByTitle(title);
  }

  @Get('byModerator/:moderatorId')
  async findManyByModeratorId(@Param('moderatorId') moderatorId: string) {
    return await this.articleService.findManyByModeratorId(moderatorId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: Partial<Article>) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
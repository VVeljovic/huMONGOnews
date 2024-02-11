import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article, ArticleState } from './article.schema';

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
  @Get('lastNWithMostViews/:n')
  async getLastNWithMostViews(@Param('n') n: number) {
    console.log('a');
    return await this.articleService.getNWithMostNumberOfViews(n);
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return this.articleService.incrementNumberOfViews(id);
  }

  @Put('contents/:id')
  async updateContents(
    @Param('id') id: string,
    @Body() contentsObj: { contents: string },
  ) {
    return await this.articleService.updateContents(id, contentsObj.contents);
  }

  @Patch('patchState/:id/:state')
  async patchArticleState(
    @Param('id') id: string,
    @Param('state') state: ArticleState,
  ) {
    return await this.articleService.patchArticleState(id, state);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }

  @Get('getLastNArticles/:n')
  async getLastNArticles(@Param('n') n: number) {
    return this.articleService.getLastNArticles(n);
  }

  @Get('findInRange/:longitude/:latitude/:maxDistance/:page/:limit')
  async findInRange(
    @Param('longitude') longitude: number,
    @Param('latitude') latitude: number,
    @Param('maxDistance') maxDistance: number,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    return this.articleService.findArticlesWithinRange(
      +longitude,
      +latitude,
      +maxDistance,
      +page,
      +limit,
    );
  }

  @Get('moderator/:moderatorId/state/:state')
  async findArticlesForModeratorInState(
    @Param('moderatorId') moderatorId: string,
    @Param('state') state: ArticleState,
  ) {
    return await this.articleService.findArticlesForModeratorInState(
      moderatorId,
      state,
    );
  }
}

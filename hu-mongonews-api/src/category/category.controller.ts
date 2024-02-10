import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.schema';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: Category) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }
  @Get('byName/:id')
  findByName(@Param('id') id: string) {
    return this.categoryService.getCategoryByName(id);
  }
  @Get('paginated/:name/:page/:limit')
  getPaginatedPosts(
    @Param('name') name: string,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    console.log(name, page, limit);
    return this.categoryService.getPaginatedPosts(name, page, limit);
  }

  @Get('categoryNames')
  getCategoryNames() {
    return this.categoryService.getCategoryNames();
  }
}

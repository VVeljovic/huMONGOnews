import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }
  @Get('byName/:id')
  findByName(@Param('id') id: string) {
    return this.categoryService.getCategoryByName(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: Category) {
    return this.categoryService.update(+id, updateCategoryDto);
  }
  @Get('categoryNames')
  getCategoryNames() {
    
    return this.categoryService.getCategoryNames();
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}

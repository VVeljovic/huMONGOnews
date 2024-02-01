import { Injectable } from '@nestjs/common';
import { Category } from './category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name)private categoryModel:Model<Category>,){}
  async create(createCategoryDto: Partial<Category>) {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return await createdCategory.save();
  }

  findAll() {
    return `This action returns all category`;
  }

  async findOne(id: string) {
    return await this.categoryModel.findById(id).populate('articles');
  }

  update(id: number, updateCategoryDto: Category) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

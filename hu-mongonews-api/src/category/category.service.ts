import { HttpException, Injectable } from '@nestjs/common';
import { Category } from './category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async create(createCategoryDto: Partial<Category>) {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return await createdCategory.save();
  }

  findAll() {
    return `This action returns all category`;
  }
  async getCategoryByName(name: string) {
    const category = await this.categoryModel.findOne({ name });
    if (category) {
      return category.populate('articles');
    } else {
      throw new HttpException('Article does not founded', 404);
    }
  }
  async findOne(id: string) {
    return await this.categoryModel.findById(id).populate('articles');
  }
  async getCategoryNames() {
    const categories = await this.categoryModel.find().exec();
    return categories.map((cat) => cat.name);
  }
  async getPaginatedPosts(name: string, page: number = 1, limit: number = 3) {
    const category = await this.categoryModel.findOne({ name });
    if (category) {
      console.log(category.articles.length);
      const lengthOfArticles = category.articles.length;
      const articles = await category.populate({
        path: 'articles',
        options: {
          limit,
          skip: (page - 1) * limit,
        },
      });

      return { length: lengthOfArticles, articles: articles };
    } else {
      throw new HttpException('Category does not exist', 404);
    }
  }

  update(id: number, updateCategoryDto: Category) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

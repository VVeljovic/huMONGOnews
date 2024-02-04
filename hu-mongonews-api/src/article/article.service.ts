import { HttpException, Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/category/category.schema';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create({ categoryId, ...createArticleDto }: Partial<Article>) {
    const findCategory = await this.categoryModel.findById(categoryId);
    if (!findCategory) throw new HttpException('Category not found', 404);
    const createdArticle = new this.articleModel(createArticleDto);
    console.log(createArticleDto.location)
    
    const createdArticleSaved = await createdArticle.save();
    findCategory.articles.push(createdArticleSaved);
    await findCategory.save();
    return createdArticleSaved;
  }
  async findArticlesWithinRange(longitude:number,latitude:number,maxRange:number,page:number = 1,limit:number = 3){
    const skipNumber = (page-1)*limit;
    const articlesWithinRange = await this.articleModel.find({
      location:{
        $near:{
          $geometry:{
            type:'Point',
            coordinates:[longitude,latitude],
          },
          $maxDistance:maxRange
        }
      }
    }).skip(skipNumber).limit(limit).exec();
    return articlesWithinRange;
  }
  async findAll() {
    return await this.articleModel.find();
  }

  async findOne(id: string) {
    return await this.articleModel.findById(id);
  }

  async findOneByTitle(title: string) {
    return await this.articleModel.findOne({ title });
  }

  async findManyByModeratorId(moderatorId: string) {
    return await this.articleModel.find({ moderator: moderatorId });
  }

  async getLastNArticles(n: number): Promise<Article[]> {
    return this.articleModel.find().sort({ dateCreated: -1 }).limit(n).exec();
  }

 async incrementNumberOfViews(id: string) {
    const article = await this.articleModel.findById(id);
    article.numberOfViews++;
    return article.save();
  }
  async getNWithMostNumberOfViews(n:number){
    const articles = await this.articleModel.find().sort({numberOfViews:-1}).limit(n).exec();
    return articles;
  }
  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}

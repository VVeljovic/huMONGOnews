import { Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async create(createArticleDto: Partial<Article>) {
    const createdArticle = new this.articleModel(createArticleDto);
    return await createdArticle.save();
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

  update(id: number, updateArticleDto: Partial<Article>) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}

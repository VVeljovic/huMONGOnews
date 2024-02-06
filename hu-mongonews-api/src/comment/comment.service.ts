import { HttpException, Injectable } from '@nestjs/common';
import { Comment } from './comment.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from 'src/article/article.schema';

@Injectable()
export class CommentService {
  constructor(  @InjectModel(Article.name) private articleModel: Model<Article>, @InjectModel(Comment.name) private commentModel: Model<Comment>){}
  async create({articleId,...createCommentDto}:Partial<Comment>) {
    const findArticle = await this.articleModel.findById(articleId);
    if(!findArticle)
    {
      throw new HttpException('Article not found',404);
    }
    const createComment = new this.commentModel(createCommentDto);
    const createCommentSaved = await createComment.save();
    findArticle.comments.push(createCommentSaved);
    await findArticle.save();
    return createCommentSaved;

  }
  async createSubComment({commentId,...createCommentDto}:Partial<Comment>){
    const findComment = await this.commentModel.findById(commentId);
    if(!findComment)
    {
      throw new HttpException('Comment not exist',404);
    }
    const createSubComment = new this.commentModel(createCommentDto);
    const createSubCommentSaved = await createSubComment.save();
    console.log(findComment);
    findComment.comments.push(createSubCommentSaved);
    await findComment.save();
    return createSubCommentSaved;

  }
  async getCommentForArticle(artilceId:string)
  {
    const findArticle = await this.articleModel.findById(artilceId);
    if(!findArticle)
    {
      throw new HttpException('Article not founded',404);
    }
    else
    {
      return findArticle.populate({
        path:'comments',
        populate: { path: 'comments' } 
      })
    }
  }
  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: string) {
    return this.commentModel.findById(id).populate('comments');
  }

  update(id: number, updateCommentDto: Comment) {
   return ;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}

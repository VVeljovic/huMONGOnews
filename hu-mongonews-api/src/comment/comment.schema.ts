import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';


export type CommentState = HydratedDocument<Comment>;

@Schema()
export class Comment {
  

  @Prop(String)
  content: string; 

  @Prop({ type: Date })
  dateCreated: Date;

  @Prop(String)
  userEmail:string;

  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Comment'}]})
  comments:Comment[];

  @Prop(String)
  articleId: string;

  commentId:string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { Moderator } from 'src/moderator/moderator.schema';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ type: String, index: true })
  title: string;

  @Prop(String)
  titleImage: string; // base64 encoded

  @Prop(String)
  contents: string;

  @Prop([String])
  contentImages: string[]; // base64 encoded

  @Prop({ type: Date })
  dateCreated: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Moderator', index: true })
  moderator: Moderator;

  @Prop(Number)
  numberOfViews: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { Comment } from 'src/comment/comment.schema';
import { Moderator } from 'src/moderator/moderator.schema';

interface Location {
  type: string;
  coordinates: number[]; // [longitude, latitude]
}

// Define the possible states
export type ArticleState = 'DRAFT' | 'POST' | 'ARCHIVE';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ type: String, unique: true, index: true })
  title: string;

  @Prop(String)
  titleImage: string; // base64 encoded

  @Prop({ type: String, index: { type: 'text' } })
  contents: string; // HTML format

  @Prop({ type: Date })
  dateCreated: Date;

  @Prop({ type: Date, default: null })
  dateStateUpdated: Date;

  @Prop({ type: String, length: 1000 })
  description: string;

  @Prop({
    type: String,
    enum: ['DRAFT', 'POST', 'ARCHIVE'],
    default: 'DRAFT',
    index: true,
  })
  state: ArticleState;

  @Prop({ type: mongoose.Schema.Types.Mixed, index: { type: '2dsphere' } })
  location: Location;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Moderator', index: true })
  moderator: Moderator;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: Number, default: 0 })
  numberOfViews: number;

  @Prop(String)
  categoryId: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

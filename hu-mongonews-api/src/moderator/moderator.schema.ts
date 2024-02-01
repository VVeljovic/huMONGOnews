import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ModeratorDocument = HydratedDocument<Moderator>;

@Schema()
export class Moderator {
  @Prop({ type: String, index: true })
  username: string;

  @Prop(String)
  password: string;

  @Prop(String)
  email: string;

  @Prop(String)
  firstName: string;

  @Prop(String)
  lastName: string;
}

export const ModeratorSchema = SchemaFactory.createForClass(Moderator);

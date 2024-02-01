import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Article } from "src/article/article.schema";

@Schema()
export class Category{
    @Prop({type:String})
    name:string;

    @Prop({description:String})
    description:string;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:'Article'}]})
    articles:Article[];
}
export const CategorySchema = SchemaFactory.createForClass(Category);
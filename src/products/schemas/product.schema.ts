import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ min: 0, default: 0 })
  discountPrice?: number;

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ required: true })
  category: string;

  @Prop()
  image?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ type: Object })
  specifications?: Record<string, any>;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: 0 })
  sales: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product); 
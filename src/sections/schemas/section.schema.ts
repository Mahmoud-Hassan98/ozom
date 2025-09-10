import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SectionDocument = Section & Document;

@Schema({ timestamps: true })
export class Section {
  @Prop({ required: true })
  page: string; 

  @Prop({ required: true })
  type: string; 

  @Prop({ type: Object })
  content?: Record<string, any>;

  @Prop({ default: true })
  visible: boolean;
}
export const SectionSchema = SchemaFactory.createForClass(Section);

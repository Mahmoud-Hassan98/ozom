import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactInfoDocument = ContactInfo & Document;

@Schema({ timestamps: true })
export class ContactInfo {
  @Prop({ required: false, default: '' })
  address: string;

  @Prop({ type: [String], required: false, default: [] })
  phones: string[];

  @Prop({ type: [String], required: false, default: [] })
  emails: string[];

  @Prop({ required: false, default: '' })
  workingHours: string;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);

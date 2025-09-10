import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

export enum ContactStatus {
  PENDING = 'pending',
  READ = 'read',
  REPLIED = 'replied',
  CLOSED = 'closed',
}

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: ContactStatus.PENDING })
  status: ContactStatus;

  @Prop()
  phone?: string;

  @Prop()
  company?: string;

  @Prop({ type: Object })
  metadata?: Record<string, any>;

  @Prop()
  ipAddress?: string;

  @Prop()
  userAgent?: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact); 
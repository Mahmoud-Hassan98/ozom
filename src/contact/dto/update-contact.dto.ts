import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { ContactStatus } from '../schemas/contact.schema';

export class UpdateContactDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsEnum(ContactStatus)
  status?: ContactStatus;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  metadata?: Record<string, any>;
} 
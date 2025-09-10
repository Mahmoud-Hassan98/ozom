import { IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the person contacting',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Valid email address for contact response',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Product Inquiry',
    description: 'Subject line for the contact message',
    minLength: 3,
    maxLength: 200,
  })
  @IsString()
  subject: string;

  @ApiProperty({
    example:
      'Hello, I would like to know more about your pharmaceutical products and services. Please contact me back at your earliest convenience.',
    description: 'Detailed message content',
    minLength: 10,
    maxLength: 2000,
  })
  @IsString()
  message: string;

  @ApiPropertyOptional({
    example: '+1-555-123-4567',
    description: 'Contact phone number (optional)',
    pattern: '^[+]?[1-9]\\d{1,14}$',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: 'Smart Pharma Inc.',
    description: 'Company or organization name (optional)',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  company?: string;
}

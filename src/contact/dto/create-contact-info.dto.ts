import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsEmail,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

export class CreateContactInfoDto {
  @ApiProperty({
    description:
      'Complete business address including street, city, state/province, postal code, and country',
    example: '123 Main Street, Suite 100, New York, NY 10001, United States',
    minLength: 10,
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Array of contact phone numbers with country codes',
    example: ['+1-555-123-4567', '+1-555-987-6543'],
    type: [String],
    minItems: 1,
    maxItems: 5,
    items: {
      type: 'string',
      pattern: '^[+]?[1-9]\\d{1,14}$',
      example: '+1-555-123-4567',
    },
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  phones: string[];

  @ApiProperty({
    description: 'Array of business email addresses for different departments',
    example: [
      'info@smartpharma.com',
      'support@smartpharma.com',
      'sales@smartpharma.com',
    ],
    type: [String],
    minItems: 1,
    maxItems: 10,
    items: {
      type: 'string',
      format: 'email',
      example: 'contact@company.com',
    },
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsEmail({}, { each: true })
  @IsNotEmpty({ each: true })
  emails: string[];

  @ApiProperty({
    description: 'Business operating hours including days and time ranges',
    example:
      'Monday - Friday: 9:00 AM - 6:00 PM | Saturday: 10:00 AM - 4:00 PM | Sunday: Closed',
    minLength: 10,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  workingHours: string;
}

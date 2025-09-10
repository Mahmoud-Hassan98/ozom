import { IsString, IsOptional, IsBoolean, IsObject } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiProperty({
    example: 'home',
    description: 'Page identifier where this section will be displayed',
    enum: ['home', 'about', 'contact', 'products', 'services'],
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @Transform(({ value }) =>
    value !== undefined && value !== null ? String(value) : '',
  )
  page: string;

  @ApiProperty({
    example: 'slider',
    description: 'Type of section component',
    enum: [
      'slider',
      'hero',
      'banner',
      'text',
      'image',
      'gallery',
      'testimonial',
      'features',
    ],
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @Transform(({ value }) =>
    value !== undefined && value !== null ? String(value) : '',
  )
  type: string;

  @ApiPropertyOptional({
    example: {
      title: 'Welcome to Smart Pharma',
      subtitle: 'Your health, our priority',
      description: 'We provide the best pharmaceutical products and services',
      buttonText: 'Learn More',
    },
    description:
      'Dynamic content object containing section-specific data like text, images, links, etc.',
  })
  @IsOptional()
  @IsObject()
  @Transform(({ value }) => {
    try {
      return typeof value === 'string'
        ? (JSON.parse(value) as Record<string, any>)
        : (value as Record<string, any>);
    } catch {
      return {} as Record<string, any>;
    }
  })
  content?: Record<string, any>;

  @ApiPropertyOptional({
    example: true,
    description: 'Controls whether this section is visible on the frontend',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  visible?: boolean;
}

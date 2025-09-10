import { IsString, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Product Name', description: 'Name of the product' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Product Description', description: 'Description of the product' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 100, description: 'Price of the product' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({ example: 80, description: 'Discount price of the product' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountPrice?: number;

  @ApiPropertyOptional({ example: 10, description: 'Stock of the product' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({ example: 'Electronics', description: 'Category of the product' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg', description: 'Image URL of the product' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: true, description: 'Is the product active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: false, description: 'Is the product featured' })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: { color: 'red', size: 'M' }, description: 'Specifications of the product' })
  @IsOptional()
  specifications?: Record<string, any>;
} 
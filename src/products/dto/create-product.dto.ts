import { IsString, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Product Name', description: 'Name of the product' })
  name: string;

  @IsString()
  description: string;

  @ApiProperty({ example: 100, description: 'Price of the product' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 80, description: 'Discount price of the product' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  discountPrice?: number;

  @ApiProperty({ example: 10, description: 'Stock of the product' })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 'Electronics', description: 'Category of the product' })
  @IsString()
  category: string;

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
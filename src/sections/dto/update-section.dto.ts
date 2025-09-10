import { IsString, IsOptional, IsBoolean, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSectionDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'home', description: 'Page name' })
  page?: string;
  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({ example: 'HOME', description: 'Section type' })
  type?: string;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({
    example: '{"title":"Slider Title","description":"Slider Description"}',
    description: 'Section content as an object',
  })
  content?: Record<string, any>;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    example: true,
    description: 'Visibility of the section',
  })
  visible?: boolean;
}

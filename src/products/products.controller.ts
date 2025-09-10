import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { UploadedFile } from '../common/services/file-upload.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
    ]),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files?: { image?: UploadedFile[] },
  ) {
    const uploadedFile = files?.image?.[0] || undefined;
    return this.productsService.create(createProductDto, uploadedFile);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully.' })
  findAll() {
    return this.productsService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
    ]),
  )
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files?: { image?: UploadedFile[] },
  ) {
    const uploadedFile = files?.image?.[0] || undefined;
    return this.productsService.update(id, updateProductDto, uploadedFile);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

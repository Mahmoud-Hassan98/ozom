import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto';
import { FileUploadService, UploadedFile } from '../common/services/file-upload.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private fileUploadService: FileUploadService,
  ) {}
  async create(data: CreateProductDto, file?: UploadedFile): Promise<Product> {
    const productData = { ...data };
    if (file) {
      const uploadedFile = this.fileUploadService.uploadFile(file, {
        uploadDir: 'uploads/products',
      });
      productData.image = uploadedFile.url;
    }
    const created = new this.productModel(productData);
    return created.save();
  }
  async findAll(): Promise<Product[]> {
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');
    await this.productModel.findByIdAndUpdate(id, { $inc: { views: 1 } });
    return product;
  }

  async update(id: string, data: UpdateProductDto, file?: UploadedFile): Promise<Product> {
    const productData = { ...data };
    if (file) {
      const uploadedFile = this.fileUploadService.uploadFile(file, {
        uploadDir: 'uploads/products',
      });
      productData.image = uploadedFile.url;
    }
    const updated = await this.productModel.findByIdAndUpdate(id, productData, { new: true }).exec();
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }
  async remove(id: string): Promise<void> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');

    if (product.image) {
      const filename = product.image.split('/').pop(); 
      if (filename) {
        this.fileUploadService.deleteFile(filename, 'uploads/products');
      }
    }
    await this.productModel.findByIdAndDelete(id).exec();
  }
}

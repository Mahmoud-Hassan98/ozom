import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from './schemas/section.schema';
import { CreateSectionDto, UpdateSectionDto } from './dto';
import {
  FileUploadService,
  UploadedFile,
} from '../common/services/file-upload.service';

@Injectable()
export class SectionsService {
  constructor(
    @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    private fileUploadService: FileUploadService,
  ) {}

  async create(data: CreateSectionDto, file?: UploadedFile): Promise<Section> {
    const sectionData = { ...data };
    if (file) {
      const uploadedFile = this.fileUploadService.uploadFile(file, {
        uploadDir: 'uploads/sections',
      });

      if (sectionData.content && typeof sectionData.content === 'object') {
        sectionData.content = {
          ...sectionData.content,
          imageUrl: uploadedFile.url,
        };
      } else {
        sectionData.content = { imageUrl: uploadedFile.url };
      }
    }
    const created = new this.sectionModel(sectionData);
    return created.save();
  }

  async findAll(filters?: {
    type?: string;
    page?: string;
  }): Promise<Section[]> {
    // Build query object with proper typing
    const query: Partial<Section> = {};

    if (filters?.type) {
      query.type = filters.type;
    }

    if (filters?.page) {
      query.page = filters.page;
    }

    // Execute query
    return this.sectionModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Section> {
    const section = await this.sectionModel.findById(id).exec();
    if (!section) throw new NotFoundException('Section not found');
    return section;
  }

  async update(
    id: string,
    data: UpdateSectionDto,
    file?: UploadedFile,
  ): Promise<Section> {
    const sectionData = { ...data };

    if (file) {
      const uploadedFile = this.fileUploadService.uploadFile(file, {
        uploadDir: 'uploads/sections',
      });

      if (sectionData.content && typeof sectionData.content === 'object') {
        sectionData.content = {
          ...sectionData.content,
          imageUrl: uploadedFile.url,
        };
      } else {
        sectionData.content = { imageUrl: uploadedFile.url };
      }
    }

    const updated = await this.sectionModel
      .findByIdAndUpdate(id, sectionData, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Section not found');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const section = await this.sectionModel.findById(id).exec();
    if (!section) throw new NotFoundException('Section not found');

    if (
      section.content &&
      typeof section.content === 'object' &&
      section.content.imageUrl
    ) {
      const fileUrl = section.content.imageUrl as string;
      const filename = fileUrl.split('/').pop();
      if (filename) {
        this.fileUploadService.deleteFile(filename, 'uploads/sections');
      }
    }
    await this.sectionModel.findByIdAndDelete(id).exec();
  }
}

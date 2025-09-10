import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Section, SectionSchema } from './schemas/section.schema';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { FileUploadService } from '../common/services/file-upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Section.name, schema: SectionSchema }]),
  ],
  controllers: [SectionsController],
  providers: [SectionsService, FileUploadService],
  exports: [SectionsService],
})
export class SectionsModule {} 
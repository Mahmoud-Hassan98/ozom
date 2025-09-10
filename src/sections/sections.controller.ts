import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SectionsService } from './sections.service';
import { UploadedFile } from '../common/services/file-upload.service';
import { CreateSectionDto, UpdateSectionDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { log } from 'console';

@ApiTags('sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new section' })
  @ApiResponse({ status: 200, description: 'Section created successfully.' })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  create(
    @Body() createSectionDto: CreateSectionDto,
    @UploadedFiles() files?: { file?: UploadedFile[] },
  ) {
    log('Creating section:', createSectionDto);
    if (typeof createSectionDto.content === 'string') {
      try {
        createSectionDto.content = JSON.parse(
          createSectionDto.content,
        ) as Record<string, any>;
      } catch {
        console.log('erorr catched');
      }
    }

    const uploadedFile = files?.file?.[0] || undefined;
    return this.sectionsService.create(createSectionDto, uploadedFile);
  }

  @Get()
  @ApiOperation({ summary: 'Get sections filtered by type and page' })
  @ApiResponse({ status: 200, description: 'Sections retrieved successfully.' })
  findAll(@Query('type') type?: string, @Query('page') page?: string) {
    const filters = { type, page };
    return this.sectionsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a section by ID' })
  @ApiResponse({ status: 200, description: 'Section retrieved successfully.' })
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a section by ID' })
  @ApiResponse({ status: 200, description: 'Section updated successfully.' })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'file', maxCount: 1 }]))
  update(
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto,
    @UploadedFiles() files?: { file?: UploadedFile[] },
  ) {
    if (typeof updateSectionDto.content === 'string') {
      try {
        updateSectionDto.content = JSON.parse(
          updateSectionDto.content,
        ) as Record<string, any>;
      } catch {
        // If parsing fails, keep as string
      }
    }
    const uploadedFile = files?.file?.[0] || undefined;
    return this.sectionsService.update(id, updateSectionDto, uploadedFile);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a section by ID' })
  @ApiResponse({ status: 200, description: 'Section deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.sectionsService.remove(id);
  }
}

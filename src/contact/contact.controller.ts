import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto, UpdateContactDto } from './dto';
import { ContactInfo } from './schemas/contact-info.schema';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }
  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get('info')
  @ApiOperation({ summary: 'Get contact information' })
  @ApiResponse({
    status: 200,
    description: 'Contact information retrieved successfully',
  })
  async getContactInfo(): Promise<ContactInfo> {
    return this.contactService.getContactInfo();
  }

  @Post('info')
  @ApiOperation({ summary: 'Create new contact information' })
  @ApiResponse({
    status: 201,
    description: 'Contact information created successfully',
  })
  async createContactInfo(
    @Body() createContactInfoDto: CreateContactInfoDto,
  ): Promise<ContactInfo> {
    return this.contactService.setContactInfo(createContactInfoDto);
  }

  @Put('info')
  @ApiOperation({ summary: 'Update contact information' })
  @ApiResponse({
    status: 200,
    description: 'Contact information updated successfully',
  })
  async setContactInfo(
    @Body() updateContactInfoDto: CreateContactInfoDto,
  ): Promise<ContactInfo> {
    return this.contactService.setContactInfo(updateContactInfoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto, UpdateContactDto } from './dto';
import {
  ContactInfo,
  ContactInfoDocument,
} from './schemas/contact-info.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    @InjectModel(ContactInfo.name)
    private contactInfoModel: Model<ContactInfoDocument>,
  ) {}

  async create(data: CreateContactDto): Promise<Contact> {
    const created = new this.contactModel(data);
    return created.save();
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id).exec();
    if (!contact) throw new NotFoundException('Contact not found');
    return contact;
  }

  async update(id: string, data: UpdateContactDto): Promise<Contact> {
    const updated = await this.contactModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Contact not found');
    return updated;
  }
  async getContactInfo(): Promise<ContactInfo> {
    let info = await this.contactInfoModel.findOne().exec();
    if (!info) {
      info = new this.contactInfoModel({
        address: 'Address not set',
        phones: ['Phone not set'],
        emails: ['email@notset.com'],
        workingHours: 'Working hours not set',
      });
      await info.save();
    }
    return info;
  }

  async setContactInfo(data: Partial<ContactInfo>): Promise<ContactInfo> {
    let info = await this.contactInfoModel.findOne().exec();
    if (!info) {
      info = new this.contactInfoModel(data);
    } else {
      Object.assign(info, data);
    }
    await info.save();
    return info;
  }
}

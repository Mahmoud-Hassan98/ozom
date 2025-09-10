import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { ContactInfo, ContactInfoSchema } from './schemas/contact-info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contact.name, schema: ContactSchema },
      { name: ContactInfo.name, schema: ContactInfoSchema },
    ]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}

import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [MailService],
  controllers: [MailController]
})
export class MailModule {}

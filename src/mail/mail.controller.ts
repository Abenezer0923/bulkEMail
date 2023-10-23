
import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MailService } from './mail.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('mail')
export class MailController {
    constructor(private readonly emailService: MailService) {}
    
    @Post('send-bulk')
    async sendBulkEmails() {
        await this.emailService.sendBulkEmails();
        return { message: 'Bulk email sending started.' };
    }


    // @Post('send-bulk')
    // @UseInterceptors(FileInterceptor('csvFile')) // 'csvFile' should match the key in the form-data
    // async sendBulkEmails(@UploadedFile() file: Express.Multer.File) {
    //     console.log("&&&&&&&&&&&&", file)
    //     const csvFilePath = file.path; // Access the file path from the uploaded file
    //     await this.emailService.sendBulkEmails();
    //     return { message: 'Bulk email sending started.' };
    // }


}


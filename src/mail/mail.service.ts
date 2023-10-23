import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as path from 'path';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail', // e.g., 'Gmail'
            auth: {
                user: 'purposeblack1@gmail.com',
                pass: 'slfhzebedainlmzo',
            },
        });
    }

    private async readCsvFile(fileName: string): Promise<string[]> {
        const filePath = path.join(__dirname, '../../mail', fileName);

        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    // Split the CSV content into an array of lines
                    const lines = data.split('\n');
                    // Process the lines as needed
                    resolve(lines);
                }
            });
        });
    }

    async sendBulkEmails() {
        try {
            const csvData = await this.readCsvFile("bulEmail.csv"); // Use this.readCsvFile
            const rows = csvData.map(line => line.split(','));
    
            for (const row of rows) {
                const [Name, email] = row;

                const htmlContent = `
                    <p>Dear ${Name},</p>
                    <p>Come Get Your Onion Now!!!</p>
                    <p>Great news!</p>
                    <p>PurposeBlack Ethiopia, a company that strives every day to make high living costs history has announced that in all the Kegeberew branches located in Adwa Dildiy, Ayat, Sar Bet, Bulbula, Summit, Lafto, and Mexico have provided you with the opportunity of a lifetime with 1 kg of Onions for ONLY 25 Birr.</p>
                    <p>Call us at <a href="tel:9858">9858</a> for more information</p>
                    <p>Kegeberew.com ይዘዙን ያሉበታ እናደርሳለን</p>
                    <p>Telegram: <a href="https://t.me/kegeberew_9858">https://t.me/kegeberew_9858</a></p>
                    <p>Let's work together!</p>
                    <p>Purpose Black Ethiopia</p>
                    <p>Don't Miss This Lifetime Opportunity!!!</p>
                    <p>Only 4 days left until the end of the 50% off discount sale PurposeBlack Ethiopia launched for the KeGeberew Real Estate Apartment Sale until September 18, 2016 E.C. due to the 2016 E.C New Year and Meskel holidays.</p>
                    <p>Take advantage of this special opportunity today!!!</p>
                `;
                

        
                const mailOptions = {
                    from: 'your_email@gmail.com', // your email address
                    to: email,
                    subject: 'PuroposeBlack ETH Weekly Updates',
                    html: htmlContent,
                };
        
                try {
                    await this.transporter.sendMail(mailOptions);
                    console.log(`Email sent to ${email}`);
                } catch (error) {
                    console.error(`Error sending email to ${email}: ${error}`);
                }
            }
        
            console.log('Bulk email sending complete.');
        } catch (error) {
            console.error('Error reading CSV file:', error);
        }
    }
}

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  async sendEmail(data:any){
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.config.get('EMAIL'),
        pass: this.config.get('EMAIL_PASS'),
      },
    });

    const file = await fs.readFileSync('./email.ejs', 'utf8');
    var emailData = {
      name: data.user.username,
      foods: JSON.parse(data.orderData).foods,
      total_price: data.total_price
    }
    const html = ejs.render(file, emailData);

    const mailOptions = {
      from: this.config.get('EMAIL_USER'),
      to: data.user.email,
      subject: 'Your order has been processed',
      html,
    };

    return transporter.sendMail(mailOptions);
  }

}
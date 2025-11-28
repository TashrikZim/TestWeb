// src/customer/pipes/email-xyz-domain.pipe.ts
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class EmailXyzDomainPipe implements PipeTransform {
  transform(value: any) {
    const email = String(value ?? '').trim();
    
    const basic = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const endsWithXyz = /\.xyz$/i.test(email.split('@')[1] ?? '');
    if (!basic || !endsWithXyz) {
      throw new BadRequestException('Email must be valid and under .xyz domain (e.g., user@abc.xyz).');
    }
    return email.toLowerCase();
  }
}

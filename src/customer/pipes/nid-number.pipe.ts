// src/customer/pipes/nid-number-10digits.pipe.ts
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NidNumber10DigitsPipe implements PipeTransform {
  transform(value: any) {
    const nid = String(value ?? '').trim();
    if (!/^\d{10}$/.test(nid)) {
      throw new BadRequestException('NID number must be exactly 10 digits.');
    }
    return nid;
  }
}

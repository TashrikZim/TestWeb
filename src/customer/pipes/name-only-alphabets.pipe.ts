// src/customer/pipes/name-only-alphabets.pipe.ts
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NameOnlyAlphabetsPipe implements PipeTransform {
  transform(value: any) {
    const name = String(value ?? '').trim();
    if (!/^[A-Za-z ]+$/.test(name)) {
      throw new BadRequestException('Name must contain only alphabets (A-Z, a-z).');
    }
    return name;
  }
}

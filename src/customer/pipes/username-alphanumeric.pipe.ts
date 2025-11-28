import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UsernameAlphanumericPipe implements PipeTransform {
  transform(value: any) {
    const username = String(value ?? '').trim();

    
    if (!/^[A-Za-z0-9_.-]+$/.test(username)) {
      throw new BadRequestException(
        'Username must contain only letters, numbers, dot (.), underscore (_) or hyphen (-).',
      );
    }

    return username.toLowerCase(); 
  }
}

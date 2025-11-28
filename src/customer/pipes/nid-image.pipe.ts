// src/customer/pipes/nid-image-max2mb.pipe.ts
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NidImageMax2MBPipe implements PipeTransform {
  private readonly MAX = 2 * 1024 * 1024; // 2 MB

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('NID image is required.');
    }
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('NID image must be an image file.');
    }
    if (file.size > this.MAX) {
      throw new BadRequestException('NID image size must be ≤ 2 MB.');
    }
    return file;
  }
}

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StringToLowercasePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (typeof value === 'string') {
      return value.toLowerCase();
    }

    return value;
  }
}

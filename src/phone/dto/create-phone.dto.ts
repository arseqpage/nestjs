import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePhoneRequest {
  @ApiProperty({
    description: 'Phone title',
    example: 'iPhone 18',
  })
  title: string;

  @ApiProperty({
    description: 'Phone release year',
    example: 2023,
  })
  releaseYear: number;

  @ApiPropertyOptional({
    description: 'Phone buy URL',
    example: 'https://example.com/phone-buy.jpg',
    type: 'string',
  })
  linkToBuy?: string;

  @ApiProperty({
    description: 'List of version IDs',
    example: ['128gb', '256gb'],
    type: [String],
  })
  versionIds: string[];
}

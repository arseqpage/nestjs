import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PhoneResponse {
  @ApiProperty({
    description: 'Phone ID',
    example: '12233443',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Phone title',
    example: 'iPhone 18',
    type: String,
  })
  title: string;
}

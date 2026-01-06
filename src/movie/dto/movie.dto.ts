import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsUUID(4, { each: true })
  actorIds: string[];

  @IsString()
  imageUrl: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @Min(1990)
  @Max(new Date().getFullYear())
  releaseYear: number;
}

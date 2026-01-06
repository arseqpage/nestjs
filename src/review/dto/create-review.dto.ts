import { IsArray, IsNumber, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsUUID(4)
  movieId: string;

  @IsString()
  text: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsArray()
  @IsUUID(4, { each: true })
  actorIds: string[];
}

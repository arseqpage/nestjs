import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ActorService } from 'src/actor/actor.service';
import { MovieService } from 'src/movie/movie.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, MovieService, ActorService],
})
export class ReviewModule {}

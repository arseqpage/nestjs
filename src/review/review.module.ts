import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { ActorService } from 'src/actor/actor.service';
import { MovieService } from 'src/movie/movie.service';
import { MoviePosterEntity } from 'src/movie/entities/poster.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      MovieEntity,
      ActorEntity,
      MoviePosterEntity,
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, MovieService, ActorService],
})
export class ReviewModule {}

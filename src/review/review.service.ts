import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { MovieService } from '../movie/movie.service';

@Injectable()
export class ReviewService {
  // constructor(
  //   @InjectRepository(ReviewEntity)
  //   private readonly reviewRepository: Repository<ReviewEntity>,
  //   private readonly movieService: MovieService,
  // ) {}
  //
  // async create(dto: CreateReviewDto): Promise<ReviewEntity> {
  //   const movie = await this.movieService.findById(dto.movieId);
  //
  //   if (!movie) {
  //     throw new NotFoundException('Фильм не найден');
  //   }
  //
  //   const { text, rating } = dto;
  //
  //   const review = this.reviewRepository.create({ text, rating, movie });
  //
  //   return await this.reviewRepository.save(review);
  // }
}

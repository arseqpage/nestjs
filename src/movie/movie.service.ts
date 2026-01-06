import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from '../actor/entities/actor.entity';
import { MoviePosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,

    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,

    @InjectRepository(MoviePosterEntity)
    private readonly moviePosterRepository: Repository<MoviePosterEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      order: {
        createdAt: 'desc',
      },
      relations: ['actors'],
    });
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['actors'],
    });

    if (!movie) {
      throw new NotFoundException('Фильм не найден');
    }

    return movie;
  }

  async create(dto: MovieDto): Promise<MovieEntity> {
    const { title, releaseYear, actorIds } = dto;
    const actors = await this.actorRepository.find({
      where: {
        id: In(actorIds),
      },
    });

    if (!actors.length) {
      throw new NotFoundException('Актеры не найдены');
    }

    let poster: MoviePosterEntity | null = null;

    if (dto.imageUrl) {
      poster = this.moviePosterRepository.create({ url: dto.imageUrl });

      await this.moviePosterRepository.save(poster);
    }

    const movie = this.movieRepository.create({
      title,
      releaseYear,
      actors,
      poster,
    });

    return await this.movieRepository.save(movie);
  }

  async update(id: string, dto: MovieDto): Promise<MovieEntity | null> {
    const movie = await this.findById(id);

    if (!movie) {
      throw new NotFoundException('Фильм не найден');
    }

    Object.assign(movie, dto);
    await this.movieRepository.save(movie);

    return this.movieRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<MovieEntity[]> {
    const movie = await this.findById(id);

    if (!movie) {
      throw new NotFoundException('Фильм не найден');
    }

    await this.movieRepository.remove(movie);

    return this.findAll();
  }
}

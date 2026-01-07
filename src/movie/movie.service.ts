import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Movie } from '@prisma/client';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.movie.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
      include: {
        actors: true,
        poster: true,
      },
    });

    if (!movie || !movie.isAvailable) {
      throw new NotFoundException('Фильм не найден');
    }

    return movie;
  }

  async create(dto: MovieDto): Promise<Movie> {
    const { title, releaseYear, actorIds, imageUrl } = dto;
    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: actorIds },
      },
    });

    if (!actors.length) {
      throw new NotFoundException('Актеры не найдены');
    }

    const movie = this.prismaService.movie.create({
      data: {
        title,
        releaseYear,
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({ id: actor.id })),
        },
      },
    });

    return movie;
  }

  async update(id: string, dto: MovieDto): Promise<boolean> {
    const movie = await this.findById(id);

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: { in: dto.actorIds },
      },
    });

    if (!actors.length) {
      throw new NotFoundException('Актеры не найдены');
    }

    await this.prismaService.movie.update({
      where: { id: movie.id },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        poster: dto.imageUrl
          ? {
              create: {
                url: dto.imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({ id: actor.id })),
        },
      },
    });

    return true;
  }

  async delete(id: string) {
    const movie = await this.findById(id);

    if (!movie) {
      throw new NotFoundException('Фильм не найден');
    }

    await this.prismaService.movie.delete({ where: { id } });

    return this.findAll();
  }
}

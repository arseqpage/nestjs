import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('movies')
export class MovieController {
  @Get()
  findAll(@Query() query: any) {
    return `Фильмы с параметрами ${JSON.stringify(query)}`;
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return `Фильм ${id}`;
  }

  @Post('create')
  create(@Body() body: { title: string; genre?: string }) {
    return `Создание фильма ${JSON.stringify(body)}`;
  }

  @Get('headers')
  getHeaders(@Headers() headers: any) {
    return `Заголовки ${JSON.stringify(headers)}`;
  }

  @Get('useragent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return `User-Agent ${userAgent}`;
  }

  @Get('request')
  getRequestDetails(@Req() req: Request) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
    };
  }

  @Get('response')
  getResponseDetails(@Res() res: Response) {
    res.status(200).json({ message: 'Response details' });
  }
}

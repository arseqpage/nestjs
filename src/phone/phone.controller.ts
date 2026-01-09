import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PhoneService } from './phone.service';
import {
  ApiBody,
  ApiHeader,
  ApiHeaders,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePhoneRequest } from './dto/create-phone.dto';
import { PhoneResponse } from './dto/phone.dto';

@ApiTags('Phone')
@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @ApiOperation({
    summary: 'Get all phones',
    description: 'Returns a list of all available phones',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Phones are found',
    type: [PhoneResponse],
  })
  @Get()
  findAll() {
    return [
      { id: 1, name: 'iPhone 18' },
      { id: 2, name: 'Samsung Galaxy S25' },
    ];
  }

  @ApiOperation({
    summary: 'Get phone by ID',
    description: 'Returns a phone by ID',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Phone ID',
  })
  // @ApiQuery({
  //   name: 'model',
  //   type: 'string',
  //   description: 'Phone model',
  // })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Phone is found',
  // })
  @ApiOkResponse({
    description: 'Phone is found',
    type: PhoneResponse,
  })
  @ApiNotFoundResponse({
    description: 'Phone not found',
    example: {
      status: HttpStatus.NOT_FOUND,
      message: 'Phone not found',
      timestamp: new Date().toISOString(),
    },
  })
  @Get(':id')
  findById(@Param('id') id: string, @Query('model') model?: string) {
    return [{ id: 1, name: 'iPhone 18' }];
  }

  @ApiOperation({
    summary: 'Create phone',
  })
  @Post()
  create(@Body() dto: CreatePhoneRequest) {
    return dto;
  }
}

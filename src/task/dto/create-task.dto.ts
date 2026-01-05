import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StartsWithDecorator } from '../decorators/starts-with.decorator';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10)
  @IsString()
  @StartsWithDecorator('task')
  title: string;

  // ---------------------------------

  @IsBoolean()
  isCompleted?: boolean;

  // ---------------------------------

  @IsOptional()
  @IsString({
    message: 'Описание должно быть строкой',
  })
  description?: string;

  // ---------------------------------

  @IsNumber(
    {},
    {
      message: 'Приоритет должен быть числом',
    },
  )
  @IsPositive({
    message: 'Приоритет должен быть положительным числом',
  })
  @IsInt({
    message: 'Приоритет должен быть целым числом',
  })
  @IsOptional()
  priority?: number;

  // ---------------------------------

  @IsArray({
    message: 'Теги должны быть массивом строк',
  })
  @IsEnum(TaskTag, {
    each: true,
    message: 'Недопустимый тег',
  })
  @IsOptional()
  tags?: TaskTag[];

  // ---------------------------------

  @IsString({
    message: 'Пароль должен быть строкой',
  })
  @MinLength(8, {
    message: 'Пароль должен быть не менее 8 символов',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ',
    },
  )
  password?: string;

  // ---------------------------------

  @IsUrl(
    {
      protocols: ['https', 'wss'],
      require_valid_protocol: true,
      host_whitelist: ['localhost', 'google.com'],
      host_blacklist: ['example.com'],
    },
    {
      message: 'Ссылка должна быть валидным HTTPS URL',
    },
  )
  websiteUrl?: string;

  // ---------------------------------

  @IsUUID('4', {
    message: 'ID пользователя должен быть UUID версии 4',
  })
  userId?: string;
}

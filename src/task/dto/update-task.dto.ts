import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty({
    message: 'Название не должно быть пустым',
  })
  @Length(2, 40, {
    message: 'Название должно быть от 2 до 40 символов',
  })
  @IsString({
    message: 'Название должно быть строкой',
  })
  @IsOptional()
  title?: string;

  // ---------------------------------

  @IsBoolean({
    message: 'Статус должен быть булевым значением',
  })
  isCompleted?: boolean;

  // ---------------------------------
}

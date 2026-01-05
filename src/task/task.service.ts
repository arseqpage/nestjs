import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    {
      id: 1,
      title: 'Task 1',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Build API',
      isCompleted: true,
    },
  ];

  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  create(dto: CreateTaskDto) {
    const id = this.tasks.length + 1;
    const newTask = {
      id,
      title: dto.title,
      isCompleted: dto.isCompleted ?? false,
      description: dto.description ?? '',
      priority: dto.priority,
      tags: dto.tags ?? [],
      password: dto.password,
      websiteUrl: dto.websiteUrl,
      userId: dto.userId,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  update(id: string, dto: UpdateTaskDto) {
    const task = this.findById(Number(id));
    task.title = dto.title ?? task.title;
    task.isCompleted = dto.isCompleted ?? task.isCompleted;

    return task;
  }

  patchUpdate(id: string, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(Number(id));

    Object.assign(task, dto);

    return task;
  }

  delete(id: string) {
    const task = this.findById(Number(id));

    this.tasks = this.tasks.filter((t) => t.id !== task.id);

    return task;
  }
}

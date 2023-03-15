import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getAllTasks();
  };

  @Post()
  postTask(@Body() newTask: CreateTaskDTO) {
    return this.tasksService.createTask(newTask.title, newTask.description);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updatedTask: UpdateTaskDTO) {
    return this.tasksService.updateTask(id, updatedTask);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask( id );

    return { message: 'Task deleted successfully.' }
  }
}

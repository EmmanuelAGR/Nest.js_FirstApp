import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { Task, TaskStatus } from './tasks.entity';
import { UpdateTaskDTO } from './dto/task.dto';

@Injectable()
export class TasksService {
  // Simulate a Database
  private tasks: Task[] = [{
    id: '1',
    title: 'first task',
    description: "some task",
    status: TaskStatus.IN_PROGRESS,
  }];
  
  getTaskById( id: string ): Task {
    return this.tasks.find( task => task.id === id );
  }

  getAllTasks() {
    return this.tasks;
  }

  createTask( title: string, description: string) {
    const task: Task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.IN_PROGRESS,
    }

    this.tasks.push( task );

    return task;
  }

  updateTask(id: string, updatedTask: UpdateTaskDTO) {
    const task =  this.getTaskById( id );
    const newTask = Object.assign(task, updatedTask);

    this.tasks.map( task => task.id === id ? newTask : task );
    return newTask;
  }
  
  deleteTask(id: string) {
    this.tasks = this.tasks.filter( task => task.id !== id );
  }
}

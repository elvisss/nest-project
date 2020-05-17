import { Controller, Get, Post, Body, Delete, Param, Put, Req, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create.task.dot';
import { TasksService } from './tasks.service';
import { ITask } from './interfaces/task';
import { Response } from 'express';

@Controller('tasks')
export class TasksController {

    constructor(
        private taskService: TasksService
    ) {
        
    }

    /* @Get()
    getTasks(): Promise<ITask[]> {
        return this.taskService.getTasks();
    } */

    @Get()
    async getTasks(@Res() res) {
        const tasks = await this.taskService.getTasks();
        return res.status(HttpStatus.OK).json({
            success: true,
            tasks
        });
    }

    @Get(':id')
    async getTaskById(@Res() res: Response, @Param('id') id: string) {
        const task = await this.taskService.getTask(id);
        if (!task) throw new NotFoundException('Task does not exists');
        return res.status(HttpStatus.OK).json(task);
    }

    @Post()
    createTask(@Body() task: CreateTaskDTO): Promise<ITask> {
        return this.taskService.createTask(task);
    }

    @Put(':id')
    async updateTask(@Res() res: Response, @Body() task: CreateTaskDTO, @Param('id') id) {
        const updatedTask = await this.taskService.updateTask(id, task);
        if (!updatedTask) throw new NotFoundException('Task does not exists');
        return res.status(HttpStatus.OK).json(updatedTask);
    }

    @Delete(':id')
    async deleteTask(@Res() res: Response, @Param('id') id: string) {
        const deletedTask = await this.taskService.deleteTask(id);
        if (!deletedTask) throw new NotFoundException('Task does not exists');
        return res.status(HttpStatus.OK).json(deletedTask);
    }

}

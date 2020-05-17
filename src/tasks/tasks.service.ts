import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITask } from './interfaces/task';
import { CreateTaskDTO } from './dto/create.task.dot';

@Injectable()
export class TasksService {

    constructor(@InjectModel('Task') private readonly taskModel: Model<ITask>) {}

    async getTasks(): Promise<ITask[]> {
        return await this.taskModel.find();
    }

    async getTask(id: string): Promise<ITask> {
        return await this.taskModel.findById(id);
    }

    async createTask(task: CreateTaskDTO): Promise<ITask> {
        const newTask = new this.taskModel(task);
        return await newTask.save();
    }

    async updateTask(id: string, task: CreateTaskDTO): Promise<ITask> {
        try {
            const updatedTask = await this.taskModel.findByIdAndUpdate(id, task, { new: true });
            return updatedTask;
        } catch(e) {
            throw new NotFoundException(e);
        }
    }

    async deleteTask(id: string): Promise<ITask> {
        try {
            const deletedTask = await this.taskModel.findByIdAndDelete(id);
            return deletedTask;
        } catch(e) {
            throw new NotFoundException(e);
        }
    }

}

import { Document } from 'mongoose';

export interface ITask extends Document {
    id?: string;
    title: string;
    description: string;
    done: boolean;
}
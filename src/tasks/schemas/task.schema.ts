import { Schema } from 'mongoose';

export const TaskSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: String,
    done: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
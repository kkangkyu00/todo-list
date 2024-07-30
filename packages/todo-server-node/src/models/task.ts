import mongoose, { Document, Schema } from 'mongoose';

export type TTask = {
  tid: string;
  name: string;
  description?: string;
  startDate: Date | string;
  endDate: Date | string;
};

export interface ITask extends TTask, Document {}

const TaskSchema: Schema = new mongoose.Schema({
  tid: {
    type: String,
    maxlength: 50,
    required: true,
    unique: 1
  },
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  description: {
    type: String,
    minlength: 100
  },
  startDate: {
    type: String,
    maxlength: 30,
    required: true
  },
  endDate: {
    type: String,
    maxlength: 30,
    required: true
  }
});

export default mongoose.model<ITask>('Task', TaskSchema);

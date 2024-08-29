import mongoose, { Schema, Model } from 'mongoose';

export type TTask = {
  tid: string;
  title: string;
  description?: string;
  startDate: Date | string;
  endDate: Date | string;
  priority?: string;
};
export interface DBTaskModel extends Model<TTask> {}

const TaskSchema: Schema = new mongoose.Schema<TTask, DBTaskModel>({
  tid: {
    type: String,
    required: true,
    unique: 1
  },
  title: {
    type: String,
    maxlength: 50,
    required: true
  },
  description: {
    type: String,
    maxlength: 100
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
  },
  priority: {
    type: String,
    maxlength: 10
  }
}, {
  collection: 'Task',
  versionKey : false
});

export default mongoose.model<TTask, DBTaskModel>('Task', TaskSchema);

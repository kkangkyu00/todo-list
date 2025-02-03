import mongoose, { Document, Schema } from 'mongoose';

export type TUser = {
  uid: string;
  signId: string;
  password: string;
  name?: string;
  email?: string;
};

export interface IUser extends TUser, Document {}

const UserSchema: Schema = new mongoose.Schema(
  {
    uid: {
      type: String,
      maxlength: 50,
      required: true,
      unique: 1
    },
    signId: {
      type: String,
      maxlength: 50,
      required: true,
      unique: 1
    },
    password: {
      type: String,
      minlength: 5,
      required: true
    },
    name: {
      type: String,
      maxlength: 30
    },
    email: {
      type: String,
      maxlength: 50
    }
  },
  {
    collection: 'User',
    versionKey: false
  }
);

export default mongoose.model<IUser>('User', UserSchema);

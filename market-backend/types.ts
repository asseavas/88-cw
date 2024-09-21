import { Model, Types } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  nickname: string;
  phone: string;
  token: string;
}

export interface PostFields {
  category: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
  price: number;
  description: string;
  image: string;
}

export interface CategoryFields {
  title: string;
}

export type ProductMutation = {
  category: string;
  user: Types.ObjectId  | undefined,
  title: string;
  price: number;
  description: string;
  image: string | null;
};

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

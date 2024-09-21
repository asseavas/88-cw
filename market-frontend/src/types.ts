export interface Category {
  _id: string;
  title: string;
}

export interface Product {
  _id: string;
  category: {
    _id: string;
    title: string;
  };
  user: {
    _id: string;
    nickname: string;
    phone: string;
  },
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductMutation {
  category: string;
  title: string;
  description: string;
  price: string;
  image: File | null;
}

export interface RegisterMutation {
  username: string;
  password: string;
  nickname: string;
  phone: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  password: string;
  nickname: string;
  phone: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
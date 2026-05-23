import { Injectable } from '@nestjs/common';
import { IUser } from './types/user.types';
@Injectable()
export class UserService {
  private users: IUser[] = [
    {
      id: 1,
      name: 'Niloy Doe',
      age: 21,
    },
    {
      id: 2,
      name: 'Piloy Gajni',
      age: 23,
    },
    {
      id: 3,
      name: 'Akah Bhagla',
      age: 34,
    },
  ];

  getAllUsers(): IUser[] {
    return this.users;
  }

  getUsersById(id: number): IUser {
    return this.users.find((user) => user.id === id) as IUser;
  }
}

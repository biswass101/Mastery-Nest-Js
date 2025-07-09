import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    users: {id: number, name: string, email: string, gender: string, isMarried: boolean}[] = [
        {id: 1, name: "NIloy", email: 'niloy@y.com', gender: "male", isMarried: false},
        {id: 2, name: "Akash", email: 'akash@cwd.com', gender: "male", isMarried: true},
        {id: 3, name: "Mim", email: 'mim@dim.com', gender: "female", isMarried: false},
        {id: 4, name: "Mahin", email: "mahin@jahin.com", gender: "male", isMarried: true},
    ]

    getAllUsers() {
        return this.users;
    }
email
    getUserById(id: number) {
        return this.users.find(x => x.id === id)
    }

    createUser(user: {id: number, name: string, email: string, gender: string, isMarried: boolean}) {
        this.users.push(user);
    }
}
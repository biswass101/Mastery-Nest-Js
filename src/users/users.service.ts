export class UsersService {
    users: {id: number, name: string, age: number, gender: string, isMarried: boolean}[] = [
        {id: 1, name: "NIloy", age: 24, gender: "male", isMarried: false},
        {id: 2, name: "Akash", age: 23, gender: "male", isMarried: true},
        {id: 3, name: "Mim", age: 20, gender: "female", isMarried: false},
        {id: 4, name: "Mahin", age: 24, gender: "male", isMarried: true},
    ]

    getAllUsers() {
        return this.users;
    }

    getUserById(id: number) {
        return this.users.find(x => x.id === id)
    }

    createUser(user: {id: number, name: string, age: number, gender: string, isMarried: boolean}) {
        this.users.push(user);
    }
}
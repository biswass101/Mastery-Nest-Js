import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './model/book.model';
import { Model } from 'mongoose';
import { CreateBookInput } from './dtos/create-book.input';
import { UpdateBookInput } from './dtos/update-book.input';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name)
    private bookModel: Model<Book>
    ) { }

    async create(input: CreateBookInput): Promise<Book> {
        const created = new this.bookModel(input);
        return await created.save();
    }

    async findAll(): Promise<Book[]> {
        return await this.bookModel.find().exec();
    }

    async findOne(id: string): Promise<Book> {
        const book = await this.bookModel.findById(id).exec()
        if (!book) throw new NotFoundException("Book Not Found!");
        return book;
    }

    async update(input: UpdateBookInput): Promise<Book> {
        const isBookExists = await this.bookModel.findById(input.id);
        if (!isBookExists) throw new NotFoundException("Book Not Found!");

        Object.assign(isBookExists, input);

        return isBookExists.save();
    }

    async remove(id: string): Promise<boolean> {
        const result = await this.bookModel.findByIdAndDelete(id);
        if (!result) throw new NotFoundException("Book Not Found!");

        return true;
    }
}

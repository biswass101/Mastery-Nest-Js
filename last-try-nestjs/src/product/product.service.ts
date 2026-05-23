import { Injectable } from '@nestjs/common';
import { IProducts } from './types/product.type';

@Injectable()
export class ProductService {
    private products: IProducts[] = [
        {
            id: 1,
            name: 'mobile',
            price: 20000,
        },
        {
            id: 2,
            name: 'laptop',
            price: 20000,
        },
        {
            id: 3,
            name: 'Car',
            price: 40000,
        },
    ];

    getAllProducts(): IProducts[] {
        return this.products;
    }

    getProductById(id: number): IProducts {
        return this.products.find((product) => product.id === id) as IProducts;
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from './schemas/inventory.schema';
import { CreateInventoryDto } from './dtos/create-inventory.dto';

@Injectable()
export class InventoryService {
    constructor(
        @InjectModel(Inventory.name)
        private inventoryModel: Model<Inventory>
    ) { }

    async insertManyInventory(
        data: CreateInventoryDto[],
    ): Promise<Inventory[]> {

        return this.inventoryModel.insertMany(data);
    };

    async insertOneInventory(data: CreateInventoryDto): Promise<Inventory> {
        return this.inventoryModel.create(data);
    }

    async findAll(): Promise<Inventory[]> {
        return this.inventoryModel.find();
    }

    async getQueryData() {
        return this.inventoryModel.find(
            {
                status: 'A',
                
            }
        ).select({ item: 1, qty: 1 });
    }
}

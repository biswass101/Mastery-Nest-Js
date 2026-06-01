import { Body, Controller, Get, ParseArrayPipe, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dtos/create-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {
  }

  @Post('seed')
  seedInventory(
    @Body(new ParseArrayPipe({ items: CreateInventoryDto })) 
    data: CreateInventoryDto[]
  ) {
    return this.inventoryService.insertManyInventory(data);
  }

  @Post('/create')
  createInventory(@Body() data: CreateInventoryDto) {
    return this.inventoryService.insertOneInventory(data);
  }

  @Get()
  getAllInventories() {
    return this.inventoryService.findAll();
  }
  
  @Get('exec-queries')
  getQueryData() {
    return this.inventoryService.getQueryData();
  }
}

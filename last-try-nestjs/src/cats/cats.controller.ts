import {
  Body,
  Controller,
  Get,
  HttpCode,
  Ip,
  Next,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { CreateCatDto } from './dtos/create-cat.dto';
import { CatsService } from './cats.service';
import { ICat } from './interfaces/cat.interface';
@Controller('cats')
export class CatsController {
  // @Get('request-object')
  // getRequestObject(@Req() req: Request): string {
  //   console.log('Request Object:', req);
  //   return 'This action returns request object!';
  // }

  // @Get('response-object')
  // getResponseObject(@Res() res: Response) {
  //   console.log('Response Object: ', res);
  //   return res.send('This action returns response object!');
  // }

  // @Get('using-next')
  // useNext(@Res() res: Response, @Next() next: NextFunction) {
  //   console.log('Giving flow to the next function');
  //   res.send("Giving Next function to control!!")
  //   next();
  // }

  // @Get('using-param/:id/person/:name')
  // useParam(@Param() param: { id: string, name: string }, @Res() res: Response, ) {
  //   console.log("used param is: ", param.id, "Person: ", param.name);
  //   res.json(param);
  // }

  // @Get('using-body')
  // useBody(@Body() data: {id: string, name: string}, @Res() res: Response) {
  //   res.json(data);
  // }

  // @Get('using-query')
  // useQuery(@Query() data: {id: string, name: string}, @Res() res: Response) {
  //   res.json(data);
  // }

  // @Get('using-ip')
  // useIp(@Ip() ip: string, @Res() res: Response) {
  //   res.json(ip);
  // }

  // @Post()
  // @HttpCode(201)
  // create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
  //  res.json(createCatDto);
  // }

  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<ICat[]> {
    return this.catsService.findAll();
  }
}

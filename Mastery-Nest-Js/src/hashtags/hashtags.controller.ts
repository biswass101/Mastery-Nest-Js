import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateHashTagDto } from './dto/create-hashtag.dto';
import { HashtagsService } from './hashtags.service';


@Controller('hashtags')
export class HashtagsController {
    constructor(private readonly hashtagService: HashtagsService) {}
    
    @Post()
    createHashtag(@Body() createHashtagDto: CreateHashTagDto) {
        return this.hashtagService.createHashtag(createHashtagDto);
    }

    @Delete(':id')
    deleteHashtag(@Param('id', ParseIntPipe) id: number) {
        return this.hashtagService.deleteHashtag(id);
    }

    @Delete('soft-delete/:id')
    softDeleteHashtag(@Param('id', ParseIntPipe) id: number) {
        return this.hashtagService.softDeleteHashtag(id);
    }
}

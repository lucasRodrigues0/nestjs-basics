import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('property')
export class PropertyController {

    @Get()
    findAll() {
        return "All properties";
    }
    @Get(':id')
    findOne(@Param("id") id:string) {
        return `finding id: ${id}`;
    }

    @Post()
    @HttpCode(202)
    create(@Body() body) {
        return body;
    }
}

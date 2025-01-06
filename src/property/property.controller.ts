import { Controller, Get } from '@nestjs/common';

@Controller('property')
export class PropertyController {

    @Get()
    findAll() {
        return "All properties";
    }
}

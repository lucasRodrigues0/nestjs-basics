import { Body, Controller, Delete, Get, Headers, Param, ParseUUIDPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDTO } from './dto/create-property.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';
import { PropertyService } from './property.service';
import { UpdatePropertyDTO } from './dto/update-property.dto';

@Controller('property')
export class PropertyController {

    constructor(private service: PropertyService) {}

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIdPipe) id: number) {
        // console.log(typeof (id));
        // return `finding id: ${id}`;
        return this.service.findOne(id);
    }

    @Post()
    // @UsePipes(new ValidationPipe({
    //     whitelist: true, /** remove os campos que não estão definidos no DTO */
    //     forbidNonWhitelisted: true /** retorna um erro caso tenha alguma propriedade não definida no DTO */
    //     /**a validação também pode ocorrer diretamente no @body ao invés de usar o decorator UsePipes*/
    // }))
    // @HttpCode(202)
    create(@Body() body: CreatePropertyDTO) {
        // return body;
        return this.service.create(body);
    }

    @Patch(':id')
    update(
        // @Param() param: IdParamDTO,
        @Param('id', ParseIdPipe) id: number,
        @Body() body: UpdatePropertyDTO,
        @RequestHeader(new ValidationPipe({
            validateCustomDecorators: true
        })) header: HeadersDto
    ) {
        // return body;
        return this.service.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIdPipe) id: number) {
        return this.service.delete(id)
    }
}

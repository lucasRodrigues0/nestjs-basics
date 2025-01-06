import { Body, Controller, Get, Headers, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDTO } from './dto/create-property.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { HeadersDto } from './dto/headers.dto';
import { RequestHeader } from './pipes/request-header';

@Controller('property')
export class PropertyController {

    @Get()
    findAll() {
        return "All properties";
    }

    @Get(':id')
    findOne(@Param('id', ParseIdPipe) id:number) {
        console.log(typeof(id));
        return `finding id: ${id}`;
    }

    @Post()
    // @UsePipes(new ValidationPipe({
    //     whitelist: true, /** remove os campos que não estão definidos no DTO */
    //     forbidNonWhitelisted: true /** retorna um erro caso tenha alguma propriedade não definida no DTO */
    //     /**a validação também pode ocorrer diretamente no @body ao invés de usar o decorator UsePipes*/
    // }))
    // @HttpCode(202)
    create(@Body() body: CreatePropertyDTO) {
        return body;
    }

    @Patch(':id')
    update(
        // @Param() param: IdParamDTO,
        @Param('id', ParseIdPipe) id: number,
        @Body() body: CreatePropertyDTO,
        @RequestHeader(new ValidationPipe({
            validateCustomDecorators: true
        })) header: HeadersDto
    ) {
        return header;
    }
}

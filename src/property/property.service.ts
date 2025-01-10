import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { CreatePropertyDTO } from './dto/create-property.dto';
import { UpdatePropertyDTO } from './dto/update-property.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class PropertyService {

    constructor(@InjectRepository(Property) private repository: Repository<Property>) { }

    async findAll(paginationDto: PaginationDTO) {
        const response = await this.repository.find({
            skip: paginationDto.skip,
            take: paginationDto.limit ?? DEFAULT_PAGE_SIZE
        });
        return response;
    }

    async findOne(id: number) {

        const response: Property | null = await this.repository.findOne({ where: { id } });

        console.log(`response: ${response}`);

        if (!response) throw new NotFoundException();

        return response;
    }

    async create(dto: CreatePropertyDTO) {
        const response = await this.repository.save(dto);
        return response;
    }

    async update(id: number, dto: UpdatePropertyDTO) {
        const response = await this.repository.update({ id }, dto);
        return response;
    }

    async delete(id: number) {
        const response = await this.repository.delete({ id });

        if(!response) throw new NotFoundException();

        return response;
    }
}

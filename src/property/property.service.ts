import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyService {

    findAll() {
        return "All properties";
    }

    findOne() {
        return "Find one";
    }

    create() {
        return "create";
    }

    update() {
        return "update";
    }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private repository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    // para a trigger funcionar é necessário que o objeto seja criado primeiro (create) e depois seja inserido (save) no banco de dados
    const user: User = this.repository.create(createUserDto);
    return await this.repository.save(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
    
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    
    if(isNaN(req.user.id) || !req.user) {
      throw new BadRequestException('é nan desgraçado');
    }
    
    return this.userService.findOne(req.user.id);
    
  }

  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
  
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  
  @Get('/get/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}

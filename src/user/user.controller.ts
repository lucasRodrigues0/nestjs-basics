import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

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

    console.log(req)
    return this.userService.findOne(req.user.id);
    
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  
  @Roles(Role.ADMIN, Role.EDITOR)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('worked!');
    // return this.userService.remove(+id);
  }
  
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  
  // @Get('/get/:id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
}

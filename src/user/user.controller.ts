import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/quantity')
  UserQuantity() {
    return this.userService.UserQuantity();
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/client/:email')

  findOneClient(@Param('email') email: string) {
    return this.userService.findOneClient(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @Patch(':id')
  updateToAdmin(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}

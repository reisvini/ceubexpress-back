import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { UserGuard } from 'src/auth/guards/user.guard';

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
  findAll(@Query('take') take: number, @Query('skip') skip: number) {
    return this.userService.findAll(+take, +skip);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(UserGuard)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(UserGuard)
  @Get('/client/:email')
  findOneClient(@Param('email') email: string) {
    return this.userService.findOneClient(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RoleGuard)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}

import { User } from './user.entity';
import { Controller , Post, Body, Get, Param, ParseIntPipe, Delete, Patch} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
    
    constructor (private usersService: UsersService) {}

    @Get() 
    getUser(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUsers(@Param('id' , ParseIntPipe)id :number) {
        
        return this.usersService.getUser(id);
    }



    @Post()
    createUser(@Body() newUser: CreateUserDto): Promise<User> {
        return this.usersService.createUser(newUser);
    }


    @Delete(':id')
    deleteUser(@Param('id' , ParseIntPipe)id :number) {
        return this.usersService.deleteUser(id);
    }

    
    @Patch (':id')
    
    updateUser(@Param('id' , ParseIntPipe)id :number , @Body() updatedUser: UpdateUserDto) {
        return this.usersService.updateUser(id , updatedUser);
    }

    @Post(':id/profile')
    createProfile(
        @Param('id' , ParseIntPipe)id :number , @Body() newProfile: CreateProfileDto) {
        return this.usersService.createProfile(id , newProfile);
        }

}

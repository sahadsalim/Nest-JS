import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll(@Res() response) {
    try {
      const deletedUser = await this.userService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'User data fetched successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') UserId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}

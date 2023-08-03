import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RegisterDTO } from 'src/user/dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,

  ) { }
  @Get("/onlyauth")
  @UseGuards(AuthGuard("jwt"))

  async hiddenInformation() {
    return "hidden information";
  }

  @Get("/anyone")

  async publicInformation() {
    return "this can be seen by anyone";
  }
  @Post('register')
  async register(@Body() RegisterDTO: RegisterDTO) {
    const user = await this.userService.create(RegisterDTO);
    const payload = {

      email: user.email,
    };
    console.log(payload);

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
  @Post('login')
  async login(@Body() UserDTO: LoginDTO) {
    const user = await this.userService.findByLogin(UserDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

}
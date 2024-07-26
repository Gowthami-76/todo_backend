import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserLoginDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags('User')
  @Post('/create-user')
  async createUser(@Body() body: CreateUserDto, @Res() res: any) {
    try {
      // body['role'] = 'employee';
      let response = await this.userService.createUser(body);

      return res.status(response.statusCode).send(response);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      });
    }
  }

  @ApiTags('User')
  @Post('/login')
  async verifyOTP(@Body() body: UserLoginDto, @Res() res: any) {
    try {
      let response = await this.userService.login(body);
      console.log(response, 'response..............');
      return res.status(response.statusCode).send(response);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      });
    }
  }
}

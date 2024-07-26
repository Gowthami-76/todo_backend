import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { User } from './dto/user.schema';
import { CreateUserDto, UserLoginDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private authService: AuthService,
  ) {}

  async createUser(req: CreateUserDto) {
    try {
      let user = await this.userModel.findOne({
        emailAddress: req.emailAddress,
      });

      if (user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: `${req.emailAddress} already registered`,
        };
      }

      user = await this.userModel.create(req);
      return {
        statusCode: HttpStatus.OK,
        message: `${req.emailAddress} created successfully`,
        data: { user },
      };
    } catch (error) {
      let error_response = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return error_response;
    }
  }

  async login(params: UserLoginDto) {
    try {
      params.emailAddress = params.emailAddress.toLowerCase();
      const user = await this.userModel
        .findOne({
          emailAddress: params.emailAddress,
          password: params.password,
        })
        .lean();

      if (!user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Invalid Login credentials',
        };
      }

      delete user.password;
      const access_token: any = await this.authService.login(user);

      const user_details: any = Object.assign({}, user);

      user_details.access_token = access_token.access_token;

      return {
        statusCode: HttpStatus.OK,
        message: 'Login successfully',
        data: { user_details },
      };
    } catch (error) {
      let error_response = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: error,
      };
      return error_response;
    }
  }

  async verifyUser(userId, password) {
    try {
      const user = await this.userModel.findOne({
        _id: userId,
        password,
      });

      return user ? true : false;
    } catch (error) {
      return false;
    }
  }
}

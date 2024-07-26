import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { ToDoListService } from './to-do-list.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createToDoDto, getToDoDto, updateToDoDto } from './dto/toDo.dto';

@Controller('to-do-list')
export class ToDoListController {
  constructor(private readonly toDoListService: ToDoListService) {}

  @ApiTags('ToDoList')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Post('/create')
  async createList(@Body() body: createToDoDto, @Res() res: any) {
    try {
      let response = await this.toDoListService.createTodoList(body);

      return res.status(response.statusCode).send(response);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      });
    }
  }

  @ApiTags('ToDoList')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get('/getList')
  async getUserList(@Query() queryParams: getToDoDto, @Res() res: any) {
    try {
      let response = await this.toDoListService.getList(queryParams);

      return res.status(response.statusCode).send(response);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      });
    }
  }

  @ApiTags('ToDoList')
  @ApiBearerAuth('JWT')
  @Post('/update')
  async updateTodoList(@Body() body: updateToDoDto, @Res() res: any) {
    try {
      let response = await this.toDoListService.updateTodo(body);

      return res.status(response.statusCode).send(response);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      });
    }
  }

  @ApiTags('ToDoList')
  @ApiBearerAuth('JWT')
  @Post('/delete')
  async deleteTodo(@Body() body: updateToDoDto, @Res() res: any) {
    try {
      let response = await this.toDoListService.deleteTodo(body);

      return res.status(response.statusCode).send(response);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorMessage: error.message,
      });
    }
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ToDoList } from './dto/toDo.schema';
import {
  createToDoDto,
  deleteToDoDto,
  getToDoDto,
  updateToDoDto,
} from './dto/toDo.dto';

@Injectable()
export class ToDoListService {
  constructor(
    @InjectModel('toDoList')
    private toDoListModel: Model<ToDoList>,
  ) {}
  async createTodoList(params: createToDoDto) {
    try {
      let toDoList = await this.toDoListModel.create(params);
      return {
        statusCode: HttpStatus.OK,
        message: 'List created successfully',
        data: { toDoList },
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

  async getList(params: getToDoDto) {
    try {
      const toDoList = await this.toDoListModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
      ]);

      return {
        statusCode: HttpStatus.OK,
        message: 'Request successful',
        data: { toDoList },
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

  async updateTodo(req: updateToDoDto) {
    try {
      await this.toDoListModel.updateOne(
        { _id: req._id },
        {
          $set: {
            title: req.title,
            desc: req.desc,
          },
        },
      );

      return {
        statusCode: HttpStatus.OK,
        message: 'Request successful',
        data: null,
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

  async deleteTodo(req: deleteToDoDto) {
    try {
      const findTodo = await this.toDoListModel.findOne({
        _id: req._id,
      });
      if (findTodo) {
        const res = await this.toDoListModel.deleteOne({
          _id: req._id,
        });
        if (res) {
          return {
            statusCode: HttpStatus.OK,
            message: 'Deleted Successfully',
            data: res,
            deletedCourse: findTodo,
          };
        } else {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Invalid Request',
          };
        }
      } else {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Exam Not Found',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }
}

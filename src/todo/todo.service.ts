/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schema/Todo';
@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private TodoModel: Model<TodoDocument>) {}

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const model = new this.TodoModel();
    model.name = createTodoDto.name;
    model.title = createTodoDto.title;
    model.author = createTodoDto.author;
    model.dadline = createTodoDto.dadline;
    model.position = createTodoDto.position;
    model.description = createTodoDto.description;
    return model.save();
  }

  findAll(): Promise<Todo[]> {
    return this.TodoModel.find().exec();
  }

  findOne(id: string): Promise<Todo> {
    return this.TodoModel.findById(id).exec();
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.TodoModel.updateOne(
      { _id: id },
      {
        name: updateTodoDto.name,
        title: updateTodoDto.title,
        author: updateTodoDto.author,
        dadline: updateTodoDto.dadline,
        position: updateTodoDto.position,
        description: updateTodoDto.description,
      },
    ).exec();
  }

  remove(id: string) {
    return this.TodoModel.deleteOne({ _id: id }).exec();
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  name: string;

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  dadline: string;

  @Prop()
  position: string;

  @Prop()
  description: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

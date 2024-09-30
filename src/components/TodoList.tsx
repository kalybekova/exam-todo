"use client";

import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "@/redux/api/todo";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import scss from "./TodoList.module.scss";
const TodoList = () => {
  const [edit, setEdit] = useState<null | number>(null);
  const { data } = useGetTodosQuery();

  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();

  const { register, handleSubmit, setValue } = useForm<ITodo>();

  const onSubmit: SubmitHandler<ITodo> = async (data) => {
    await editTodo({ _id: edit!, data });
    setEdit(null);
  };

  return (
    <div className={scss.todoList}>
      <div className="container">
        {data?.map((el) =>
          edit === el._id ? (
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("title", { required: true })} />
                <input type="file" />
                <button type="submit">send</button>
              </form>
            </div>
          ) : (
            <div key={el._id} className={scss.todo}>
              <h1>{el.title}</h1>
              <img src={el.img} alt="" />
              <button onClick={() => deleteTodo(el._id)}>delete</button>
              <button
                onClick={() => {
                  setEdit(el._id);
                  setValue("title", el.title);
                }}
              >
                edit
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TodoList;

"use client";
import { useUploadFileMutation } from "@/redux/api/file";
import { usePostTodoMutation } from "@/redux/api/todo";

import { SubmitHandler, useForm } from "react-hook-form";

const TodoAdd = () => {
  const [postTodo] = usePostTodoMutation();
  const { register, handleSubmit } = useForm<ITodo>();
  const [uploadFileMutation] = useUploadFileMutation();

  // const onSubmit: SubmitHandler<ITodo> = async (data) => {
  //   await postTodo(data);
  //   console.log("🚀 ~ constonSubmit:SubmitHandler<ITodo>= ~ data:", data);
  // };

  const onSubmit: SubmitHandler<ITodo> = async (data) => {
    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);

    const { data: responseImage } = await uploadFileMutation(formData);
    console.log(responseImage);

    const newData = {
      title: data.title,
      img: responseImage?.url!,
      
    };

    await postTodo(newData);
  };

  return (
    <div>
      <div className="container">
        <h1>Todo List</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("title", { required: true })} />
          <input type="file" {...register("file", { required: true })} />
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  );
};

export default TodoAdd;

"use client";
import { useUploadFileMutation } from "@/redux/api/file";
import { usePostTodoMutation } from "@/redux/api/todo";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./TodoAdd.module.scss";

const TodoAdd = () => {
  const [postTodo] = usePostTodoMutation();
  const { register, handleSubmit } = useForm<ITodo>();
  const [uploadFileMutation] = useUploadFileMutation();

  const onSubmit: SubmitHandler<ITodo> = async (data) => {
    const file = data.file![0]!;
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
    <div className={scss.TodoAdd}>
      <div className="container">
        <div className={scss.content}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("title", { required: true })} />
            <input type="file" {...register("file", { required: true })} />
            <button type="submit">send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoAdd;

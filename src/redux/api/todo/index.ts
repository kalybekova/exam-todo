import { api as index } from "..";

const ENDPOINT = `${process.env.NEXT_PUBLIC_ENDPOINT}`;

const api = index.injectEndpoints({
  endpoints: (bulider) => ({
    getTodos: bulider.query<TODO.getTodosRes, TODO.getTodosReq>({
      query: () => ({
        url: `${ENDPOINT}`,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),

    postTodo: bulider.mutation<TODO.postTodoRes, TODO.postTodoReq>({
      query: (data) => ({
        url: `${ENDPOINT}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),

    deleteTodo: bulider.mutation<TODO.deleteTodoRes, TODO.deleteTodoReq>({
      query: (_id) => ({
        url: `${ENDPOINT}/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),

    editTodo: bulider.mutation<TODO.editTodoRes, TODO.editTodoReq>({
      query: ({ data, _id }) => ({
        url: `${ENDPOINT}/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  usePostTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} = api;

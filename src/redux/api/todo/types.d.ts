namespace TODO {
  type getTodosRes = ITodo[];
  type getTodosReq = void;

  type postTodoRes = ITodo[];
  type postTodoReq = ITodo;

  type deleteTodoRes = ITodo[];
  type deleteTodoReq = number;

  type editTodoRes = ITodo[];
  type editTodoReq = {
    _id: number;
    data: ITodo;
  };
}

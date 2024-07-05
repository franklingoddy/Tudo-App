import { Droppable } from "react-beautiful-dnd";
import { Todo } from "./Modal";
import SingleTodo from "./SingleTodo";
import "./style.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="todos-List">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="Todos-heading">Active Task</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="todos-Remove">
  {(provided) => (
    <div
      className="todos-remove"
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      <span className="todos-heading">Completed Task</span>
      {todos.map((todo, index) => (
        <SingleTodo
          index={index}
          todo={todo}
          todos={completedTodos}
          key={todo.id}
          setTodos={setCompletedTodos}
        />
      ))}
      {provided.placeholder}
    </div>
  )}
</Droppable>
    </div>
  );
};
export default TodoList;

import { Todo } from "./Modal";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./style.css";
import { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <div>
      <Draggable draggableId={todo.id.toString()} index={index}>
         {
          (provided) => (
            <form className="todos-single" onSubmit={(e) => handleEdit(e, todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>
            {edit ? (
              <input
                ref={inputRef}
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                className="edith-input"
              />
            ) : todo.isDone ? (
              <s className="todos-single-text">{todo.todo}</s>
            ) : (
              <span className="todos-single-text">{todo.todo}</span>
            )}
    
            <div>
              <span className="icon">
                <AiFillEdit
                  onClick={() => {
                    if (!edit && !todo.isDone) {
                      setEdit(!edit);
                    }
                  }}
                />
              </span>
              <span className="icon">
                <AiFillDelete onClick={() => handleDelete(todo.id)} />
              </span>
              <span className="icon" onClick={() => handleDone(todo.id)}>
                <MdDone />
              </span>
            </div>
          </form>
          )
         }
      </Draggable>
    </div>
  );
};
export default SingleTodo;

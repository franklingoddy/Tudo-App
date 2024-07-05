import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/Modal";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";


const App = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState <Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };
  // console.log(todos);
  const onDragEnd = (results: DropResult) => {
   const { source, destination } = results;
   if(!destination) return;
   if(destination.droppableId === source.droppableId && destination.index === source.index)
    return;

   if(source.droppableId === "TodoList"){
    add = active[source.index]
   }

  };
  return (
   <DragDropContext onDragEnd={onDragEnd}>
   <div className="App">
      <span className="header">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos} 
       completedTodos ={completedTodos}
       setCompletedTodos={setCompletedTodos}
      />
    </div>
   </DragDropContext>
  );
};

export default App;

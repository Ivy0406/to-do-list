import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  editingId,
  tempContent,
  setTempContent,
  toggleTodoStatus,
  deleteTodo,
  startEditing,
  cancelEditing,
  saveEditing,
}) => {
  return (
    <ul className="pt-5.75 px-4 flex flex-col gap-4 text-text-main">
      {[...todos].reverse().map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          editingId={editingId}
          tempContent={tempContent}
          setTempContent={setTempContent}
          toggleTodoStatus={toggleTodoStatus}
          deleteTodo={deleteTodo}
          startEditing={startEditing}
          cancelEditing={cancelEditing}
          saveEditing={saveEditing}
        />
      ))}
    </ul>
  );
};

export default TodoList;

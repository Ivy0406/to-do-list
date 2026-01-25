import iconCheck from "../../images/icon-check.svg";
import iconCheckbox from "../../images/icon-checkbox.svg";
import iconDelete from "../../images/icon-delete.svg";

const TodoItems = ({
  todo,
  editingId,
  tempContent,
  setTempContent,
  toggleTodoStatus,
  deleteTodo,
  startEditing,
  cancelEditing,
  saveEditing
}) => {
  const isEditing = editingId === todo.id;
  return (
    <li className="group pb-3.75 border-b border-[#E5E5E5] lg:border-0 lg:pb-0"
    >
      <div className="flex justify-between">
        <div className="w-full flex gap-4 lg:border-b lg:border-[#E5E5E5] lg:pb-3.75 lg:mr-4">
          <button
            className="cursor-pointer"
            onClick={() => toggleTodoStatus(todo.id)}
          >
            <img
              src={
                todo.status
                  ? iconCheck
                  : iconCheckbox
              }
              alt="勾選框"
            />
          </button>

          {isEditing ? (
            <input
              type="text"
              value={tempContent}
              onChange={(e) => setTempContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEditing(todo.id);
                if (e.key === "Escape") cancelEditing();
              }}
              autoFocus
              onBlur={cancelEditing}
              className="w-full bg-input-default outline-none focus:border-2 focus:border-primary focus:rounded-[5px]"
            ></input>
          ) : (
            <p
              className={
                todo.status ? "text-text-sub line-through" : "text-text-main"
              }
              onClick={() => startEditing(todo.id, todo.content)}
            >
              {todo.content}
            </p>
          )}
        </div>
        <button
          className="cursor-pointer w-4 h-fit lg:hidden lg:group-hover:block "
          onClick={() => deleteTodo(todo.id)}
        >
          <img
            src={iconDelete}
            alt="刪除按鈕"
            className="w-full h-full object-contain "
          />
        </button>
      </div>
    </li>
  );
};

export default TodoItems;

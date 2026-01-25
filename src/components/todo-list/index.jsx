import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../api/apiRequest";
import Cookies from "js-cookie";
import Empty from "./Empty";
import TodoTabs from "./TodoTabs";
import { useTodos } from "../../hooks/useTodos";
import { useAuth } from "../../hooks/useAuth";
import TodoList from "./TodoList";
import Loading from "../shared/Loading";
import LOGO_IMG from "../../images/logo_lg.svg";
import ICON_PLUS from "../../images/icon-plus.svg";

const TodoListPage = () => {
  const {
    todos,
    isLoading,
    isTodosEmpty,
    newContent,
    editingId,
    tempContent,
    setNewContent,
    setTempContent,
    getTodos,
    addTodos,
    toggleTodoStatus,
    deleteTodo,
    startEditing,
    cancelEditing,
    saveEditing,
  } = useTodos();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem("todoUserNickname") || "親愛的用戶";
  });
  const [currentTab, setCurrentTab] = useState("all");
  const selectedTodos = todos.filter((todo) => {
    if (currentTab === "all") return true;
    if (currentTab === "pending") return !todo.status;
    if (currentTab === "done") return todo.status;
  });
  const pendingCounts = todos.filter((todo) => !todo.status).length;

  const { signOut } = useAuth();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await apiRequest.get("/users/checkout");
        setNickname(res.data.nickname);
        localStorage.setItem("todoUserNickname", res.data.nickname);
        getTodos();
      } catch (error) {
        console.log("驗證失敗ＱＱ，請重新登入", error);
        Cookies.remove("todoUserToken");
        localStorage.removeItem("todoUserNickname");
        navigate("/");
      }
    };
    checkToken();
  }, []);

  return (
    <main className="bg-primary lg:bg-[linear-gradient(172.7deg,#FFD370_5.12%,#FFD370_53.33%,#FFD370_53.44%,#FFFFFF_53.45%,#FFFFFF_94.32%)] w-full min-h-dvh flex ">
      <div className="w-full h-full flex flex-col gap-4 px-3 mx-auto lg:gap-[40.55px] lg:px-0 lg:items-center py-4 ">
        <div className="w-full max-w-96.5 mx-auto flex justify-between items-center lg:max-w-241">
          <div className="flex justify-center items-center">
            <img
              className="h-10 aspect-square"
              src={LOGO_IMG}
              alt="logo"
            />
            <h1 className="font-sub font-bold text-text-main text-[24px]">
              ONLINE TODO LIST
            </h1>
          </div>
          <nav className="flex gap-6">
            <p className="hidden w-fit text-text-main font-bold lg:block">
              {nickname}的待辦
            </p>
            <button
              className="w-fit text-[14px] font-normal text-text-main cursor-pointer"
              onClick={signOut}
            >
              登出
            </button>
          </nav>
        </div>
        <div className="w-full max-w-125 mx-auto flex flex-col items-center gap-6.5 px-8 lg:gap-4">
          <form className="relative w-full ">
            <input
              id="newTodo"
              type="text"
              placeholder="新增待辦事項"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full h-full bg-input-default rounded-[10px] px-4 py-3 shadow-[0_0_15px_rgba(0,0,0,0.15)]"
            />
            <button
              onClick={addTodos}
              className="absolute right-1 top-1 bg-text-main rounded-[10px] w-10 h-9.75 flex items-center justify-center cursor-pointer"
            >
              <img
                src={ICON_PLUS}
                alt="新增按鈕"
                className="w-5 aspect-square object-center"
              />
            </button>
          </form>
          {isLoading ? (
            <Loading />
          ) : isTodosEmpty ? (
            <Empty />
          ) : (
            <div className="w-full bg-input-default rounded-[10px] shadow-[0_0_15px_rgba(0,0,0,0.15)] ">
              <TodoTabs currentTab={currentTab} onTabChange={setCurrentTab} />
              <TodoList
                todos={selectedTodos}
                editingId={editingId}
                tempContent={tempContent}
                setTempContent={setTempContent}
                toggleTodoStatus={toggleTodoStatus}
                deleteTodo={deleteTodo}
                startEditing={startEditing}
                cancelEditing={cancelEditing}
                saveEditing={saveEditing}
              />
              <div className="p-4">
                <p className="text-text-main">{pendingCounts} 個待完成項目</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default TodoListPage;

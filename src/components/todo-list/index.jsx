import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../api/apiRequest";
import Cookies from "js-cookie";
import Empty from "./Empty";

const TodoList = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newContent, setNewContent] = useState("");
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem("todoUserNickname") || "親愛的用戶";
  });
  const [editingId, setEditingId] = useState(null);
  const [tempContent, setTempContent] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const selectedTodos = todos.filter((todo) => {
    if (currentTab === "all") return true;
    if (currentTab === "pending") return !todo.status;
    if (currentTab === "done") return todo.status;
  });
  const pendingCounts = todos.filter((todo) => !todo.status).length;

  async function handleGetTodos() {
    try {
      const res = await apiRequest.get("/todos/");
      setTodos(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await apiRequest.get("/users/checkout");
        setNickname(res.data.nickname);
        localStorage.setItem("todoUserNickname", res.data.nickname);
        handleGetTodos();
      } catch (error) {
        console.log("驗證失敗ＱＱ，請重新登入", error);
        Cookies.remove("todoUserToken");
        localStorage.removeItem("todoUserNickname");
        navigate("/");
      }
    };
    checkToken();
  }, []);

  async function handleSignOut() {
    try {
      const res = await apiRequest.post("/users/sign_out");
      if (res.data.status) {
        Cookies.remove("todoUserToken");
        localStorage.removeItem("todoUserNickname");
        console.log("您已成功登出!期待下次再見＾＿＾");
        navigate("/");
      }
    } catch (error) {
      console.log("登出失敗Ｑ＿Ｑ", error);
      Cookies.remove("todoUserToken");
      localStorage.removeItem("todoUserNickname");
    }
  }

  async function handleAddTodos() {
    const itemToAdd = {
      content: newContent,
    };
    try {
      await apiRequest.post("/todos/", itemToAdd);
      setNewContent("");
      handleGetTodos();
    } catch (error) {
      console.log("新增失敗ＱＱ", error);
    }
  }

  async function handleTodoStatus(id) {
    try {
      await apiRequest.patch(`/todos/${id}/toggle`);
      handleGetTodos();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTodo(id) {
    try {
      const res = await apiRequest.delete(`/todos/${id}`);
      if (res.data.status) {
        handleGetTodos();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleStartEditing(id, currentContent) {
    setEditingId(id);
    setTempContent(currentContent);
  }

  function handleCancelEditing() {
    setEditingId(null);
    setTempContent("");
  }

  async function handleSaveEditing(id) {
    if (!tempContent.trim()) {
      handleCancelEditing();
      return;
    }

    try {
      const dataForUpdate = {
        content: tempContent,
      };
      const res = await apiRequest.put(`/todos/${id}`, dataForUpdate);
      console.log(res.data.message);
      setEditingId(null);
      handleGetTodos();
    } catch (error) {
      console.log("編輯失敗ＱＱ", error);
    }
  }

  return (
    <main className="bg-primary lg:bg-[linear-gradient(172.7deg,#FFD370_5.12%,#FFD370_53.33%,#FFD370_53.44%,#FFFFFF_53.45%,#FFFFFF_94.32%)] w-full min-h-dvh flex lg:items-center ">
      <div className="w-full h-full flex flex-col gap-4 px-3 mx-auto lg:gap-[40.55px] lg:px-0 lg:items-center py-4 ">
        <div className="w-full max-w-96.5 mx-auto flex justify-between items-center lg:max-w-241">
          <div className="flex justify-center items-center">
            <img
              className="h-10 aspect-square"
              src="/src/images/logo_lg.svg"
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
              onClick={handleSignOut}
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
              onClick={handleAddTodos}
              className="absolute right-1 top-1 bg-text-main rounded-[10px] w-10 h-9.75 flex items-center justify-center cursor-pointer"
            >
              <img
                src="/src/images/icon-plus.svg"
                alt="新增按鈕"
                className="w-5 aspect-square object-center"
              />
            </button>
          </form>
          {todos.length === 0 ? (
            <Empty />
          ) : (
            <div className="w-full bg-input-default rounded-[10px] shadow-[0_0_15px_rgba(0,0,0,0.15)] ">
              <div className="flex h-12.75">
                <button
                  value="all"
                  onClick={(e) => setCurrentTab(e.target.value)}
                  className={`flex-1 font-bold  cursor-pointer text-[14px] ${currentTab === "all" ? "text-text-main border-b-2 border-text-main" : " font-bold text-text-sub border-b-2 border-[#EFEFEF]"}`}
                >
                  全部
                </button>
                <button
                  value="pending"
                  onClick={(e) => setCurrentTab(e.target.value)}
                  className={`flex-1 font-bold cursor-pointer text-[14px] ${currentTab === "pending" ? " text-text-main border-b-2 border-text-main" : "font-bold text-text-sub border-b-2 border-[#EFEFEF]"}`}
                >
                  待完成
                </button>
                <button
                  value="done"
                  onClick={(e) => setCurrentTab(e.target.value)}
                  className={`flex-1 font-bold  cursor-pointer text-[14px] ${currentTab === "done" ? "text-text-main border-b-2 border-text-main" : " text-text-sub border-b-2 border-[#EFEFEF]"}`}
                >
                  已完成
                </button>
              </div>
              <ul className="pt-5.75 px-4 flex flex-col gap-4 text-text-main">
                {[...selectedTodos].reverse().map((item) => (
                  <li
                    key={item.id}
                    className="group pb-3.75 border-b border-[#E5E5E5] lg:border-0 lg:pb-0"
                  >
                    <div className="flex justify-between">
                      <div className="w-full flex gap-4 lg:border-b lg:border-[#E5E5E5] lg:pb-3.75 lg:mr-4">
                        <button
                          className="cursor-pointer"
                          onClick={() => handleTodoStatus(item.id)}
                        >
                          <img
                            src={
                              item.status
                                ? "/src/images/icon-check.svg"
                                : "/src/images/icon-checkbox.svg"
                            }
                            alt="勾選框"
                          />
                        </button>

                        {editingId === item.id ? (
                          <input
                            type="text"
                            value={tempContent}
                            onChange={(e) => setTempContent(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveEditing(item.id);
                              if (e.key === "Escape") handleCancelEditing();
                            }}
                            autoFocus
                            onBlur={handleCancelEditing}
                            className="w-full bg-input-default outline-none focus:border-2 focus:border-primary focus:rounded-[5px]"
                          ></input>
                        ) : (
                          <p
                            className={
                              item.status
                                ? "text-text-sub line-through"
                                : "text-text-main"
                            }
                            onClick={() =>
                              handleStartEditing(item.id, item.content)
                            }
                          >
                            {item.content}
                          </p>
                        )}
                      </div>
                      <button
                        className="cursor-pointer w-4 h-fit lg:hidden lg:group-hover:block "
                        onClick={() => handleDeleteTodo(item.id)}
                      >
                        <img
                          src="/src/images/icon-delete.svg"
                          alt="刪除按鈕"
                          className="w-full h-full object-contain "
                        />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
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

export default TodoList;

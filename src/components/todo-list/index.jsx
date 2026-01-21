import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../api/apiRequest";
import Cookies from "js-cookie";

const TodoList = () => {
  const navigate = useNavigate();
  const [newContent, setNewContent] = useState("");

  async function handleSignOut () {
    try {
      const res = await apiRequest.post("/users/sign_out");
      if (res.data.status) {
        Cookies.remove("todoUserToken");
        localStorage.removeItem('todoUserNickname');
        console.log("您已成功登出!期待下次再見＾＿＾");
        navigate("/");
      }
    } catch (error) {
      console.log("登出失敗Ｑ＿Ｑ",error);
      Cookies.remove("todoUserToken");
      localStorage.removeItem('todoUserNickname');
    }
  };

  return (
    <main className="bg-primary lg:bg-[linear-gradient(172.7deg,#FFD370_5.12%,#FFD370_53.33%,#FFD370_53.44%,#FFFFFF_53.45%,#FFFFFF_94.32%)] w-full h-full flex lg:items-center ">
      <div className="w-full h-full flex flex-col gap-4 px-3 mx-auto lg:gap-[40.55px] lg:px-0 lg:items-center ">
        <div className="w-full max-w-96.5 mx-auto flex justify-between items-center pt-4 lg:pt-4 lg:max-w-241">
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
              王小明的待辦
            </p>
            <button className="w-fit text-[14px] font-normal text-text-main cursor-pointer" onClick={handleSignOut}>
              登出
            </button>
          </nav>
        </div>
        <div className="w-full max-w-125 mx-auto flex flex-col items-center gap-6.5 px-8 lg:gap-4">
          <form className="relative w-full ">
            <input
              type="text"
              placeholder="新增待辦事項"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full h-full bg-input-default rounded-[10px] px-4 py-3 shadow-[0_0_15px_rgba(0,0,0,0.15)]"
            />
            <button className="absolute right-1 top-1 bg-text-main rounded-[10px] w-10 h-9.75 flex items-center justify-center cursor-pointer">
              <img
                src="/src/images/icon-plus.svg"
                alt="新增按鈕"
                className="w-5 aspect-square object-center"
              />
            </button>
          </form>
          <div className="w-full bg-input-default rounded-[10px] shadow-[0_0_15px_rgba(0,0,0,0.15)] ">
            <div className="flex h-12.75">
              <button
                value="all"
                className="flex-1 text-[14px] font-bold text-text-sub border-b-2 border-[#EFEFEF] active:font-bold active:text-text-main active:border-b-2 active:border-text-main cursor-pointer"
              >
                全部
              </button>
              <button
                value="pending"
                className="flex-1 text-[14px] font-bold text-text-sub border-b-2 border-[#EFEFEF] active:font-bold active:text-text-main active:border-text-main cursor-pointer"
              >
                待完成
              </button>
              <button
                value="done"
                className="flex-1 text-[14px] font-bold text-text-sub border-b-2 border-[#EFEFEF] active:font-bold active:text-text-main active:border-text-main  cursor-pointer"
              >
                已完成
              </button>
            </div>
            <ul className="pt-5.75 px-4 flex flex-col gap-4 text-text-main">
              <li className="group pb-3.75 border-b border-[#E5E5E5] lg:border-0 lg:pb-0">
                <div className="flex justify-between">
                  <div className="w-full flex gap-4 lg:border-b lg:border-[#E5E5E5] lg:pb-3.75 lg:mr-4">
                    <button className="cursor-pointer">
                      <img src="/src/images/icon-checkbox.svg" alt="勾選框" />
                    </button>
                    <p>把冰箱發霉的檸檬拿去丟</p>
                  </div>
                  <button className="cursor-pointer w-4 aspect-square lg:hidden lg:group-hover:block">
                    <img src="/src/images/icon-delete.svg" alt="刪除按鈕" className="w-full"/>
                  </button>
                </div>
              </li>
              <li className="pb-3.75 border-b border-[#E5E5E5]">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <button className="cursor-pointer">
                      <img src="/src/images/icon-check.svg" alt="勾選" />
                    </button>
                    <p className="text-text-sub line-through">
                      打電話叫媽媽匯款給我
                    </p>
                  </div>
                  <button className="cursor-pointer">
                    <img src="/src/images/icon-delete.svg" alt="刪除按鈕" />
                  </button>
                </div>
              </li>
              <li className="pb-3.75 border-b border-[#E5E5E5]">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <button>
                      <img src="/src/images/icon-checkbox.svg" alt="勾選框" />
                    </button>
                    <p>整理電腦資料夾</p>
                  </div>
                  <button>
                    <img src="/src/images/icon-delete.svg" alt="刪除按鈕" />
                  </button>
                </div>
              </li>
              <li className="pb-3.75 border-b border-[#E5E5E5]">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <button>
                      <img src="/src/images/icon-check.svg" alt="勾選" />
                    </button>
                    <p className="text-text-sub line-through">
                      繳電費水費瓦斯費
                    </p>
                  </div>
                  <button>
                    <img src="/src/images/icon-delete.svg" alt="刪除按鈕" />
                  </button>
                </div>
              </li>
              <li className="pb-3.75 border-b border-[#E5E5E5]">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <button>
                      <img src="/src/images/icon-checkbox.svg" alt="勾選框" />
                    </button>
                    <p>約vicky禮拜三泡溫泉</p>
                  </div>
                  <button>
                    <img src="/src/images/icon-delete.svg" alt="刪除按鈕" />
                  </button>
                </div>
              </li>
              <li className="pb-3.75 border-b border-[#E5E5E5]">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <button>
                      <img src="/src/images/icon-checkbox.svg" alt="勾選框" />
                    </button>
                    <p>約ada禮拜四吃晚餐</p>
                  </div>
                  <button>
                    <img src="/src/images/icon-delete.svg" alt="刪除按鈕" />
                  </button>
                </div>
              </li>
            </ul>
            <div className="p-4"><p className="text-text-main">5 個待完成項目</p></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TodoList;



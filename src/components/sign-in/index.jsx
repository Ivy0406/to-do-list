import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../api/apiRequest";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignIn(e) {
    e.preventDefault();
    const dataForSignIn = {
      email: email,
      password: password,
    };
    try {
      const res = await apiRequest.post("/users/sign_in", dataForSignIn);
      const { token, exp, nickname } = res.data;
      const expDate = new Date(exp * 1000).toUTCString();
      document.cookie = `todoUserToken=${token}; expires=${expDate}; path=/`;
      localStorage.setItem('todoUserNickname', nickname);
      setEmail("");
      setPassword("");
      console.log("登入成功了！");
      navigate("/todos")
    } catch (error) {
      console.log("登入失敗了ＱＱ，請檢查錯誤訊息：", error);
    }
  }

  return (
    <main className="bg-primary w-full h-full flex lg:items-center ">
      <div className="w-full h-full max-w-199 flex flex-col gap-4 px-3 mx-auto lg:flex lg:flex-row lg:justify-between lg:px-0 lg:max-h-112 ">
        <div className="pt-12 lg:pt-0">
          <div className="flex justify-center items-center">
            <img
              className="h-10 aspect-square"
              src="/src/images/logo_lg.svg"
              alt="logo"
            />
            <h1 className="font-sub font-bold text-text-main text-[32px]">
              ONLINE TODO LIST
            </h1>
          </div>
          <div className="hidden w-full max-w-96.5 aspect-square lg:block lg:pt-3.75">
            <img
              src="/src/images/key-visual.svg"
              alt="主視覺"
              className="w-full aspect-square object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:gap-6 lg:pt-15.5">
          <h2 className="text-[20px] font-bold text-text-main text-center lg:text-2xl">
            最實用的線上代辦事項服務
          </h2>
          <form className="w-full max-w-76 mx-auto flex flex-col items-center gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="Email"
                className="text-text-main text-[14px] font-bold"
              >
                Email
              </label>
              <input
                id="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="請輸入Email"
                className="bg-input-default rounded-[10px] px-4 py-3"
              ></input>
              <p className="text-accent font-bold text-[14px] pt-1.5">
                此欄位不可為空
              </p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="password"
                className="text-text-main text-[14px] font-bold"
              >
                Password
              </label>
              <input
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="請輸入密碼"
                className="bg-input-default rounded-[10px] px-4 py-3"
              ></input>
              <p className="hidden text-accent font-bold text-[14px] pt-1.5">
                此欄位不可為空
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={e=>handleSignIn(e)}
                className="w-full max-w-32 bg-text-main rounded-[10px] text-input-default text-[16px] font-bold px-12 py-3 cursor-pointer"
              >
                登入
              </button>
              <Link to="/signup" className="w-full max-w-32 cursor-pointer font-bold py-3 px-12">
                註冊
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignIn;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../api/apiRequest";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("兩次密碼輸入不一致");
      return;
    }

    const dataForSignUp = {
      email: email,
      password: password,
      nickname: nickname,
    };

    try {
      const res = await apiRequest.post("/users/sign_up", dataForSignUp);
      console.log("註冊成功！請重新登入",res.data);
      navigate("/");
    } catch (error) {
      console.log("註冊失敗ＱＱ，錯誤訊息：", error);
    }
  }

  return (
    <main className="bg-primary w-full h-full flex lg:items-center ">
      <div className="w-full h-full max-w-199 flex flex-col gap-4 px-3 mx-auto lg:flex lg:flex-row lg:justify-between lg:px-0 lg:items-center ">
        <div className="w-full max-w-96.5 mx-auto pt-12 lg:pt-0">
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
        <div className="w-full max-w-76 mx-auto flex flex-col gap-6.5 lg:gap-6">
          <h2 className="text-[20px] font-bold text-text-main text-center lg:text-2xl lg:text-start">
            註冊帳號
          </h2>
          <form className="w-full  flex flex-col items-center gap-4">
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
              <p className="hidden text-accent font-bold text-[14px] pt-1.5">
                此欄位不可為空
              </p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="nickname"
                className="text-text-main text-[14px] font-bold"
              >
                您的暱稱
              </label>
              <input
                id="nickname"
                autoComplete="username"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                type="text"
                placeholder="請輸入暱稱"
                className="bg-input-default rounded-[10px] px-4 py-3"
              ></input>
              <p className="hidden text-accent font-bold text-[14px] pt-1.5">
                此欄位不可為空
              </p>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="password"
                className="text-text-main text-[14px] font-bold"
              >
                密碼
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
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="confirmPassword"
                className="text-text-main text-[14px] font-bold"
              >
                再次輸入密碼
              </label>
              <input
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="請再次輸入密碼"
                className="bg-input-default rounded-[10px] px-4 py-3"
              ></input>
              <p className="hidden text-accent font-bold text-[14px] pt-1.5">
                此欄位不可為空
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:pt-4.5">
              <button
                onClick={(e) => handleSignUp(e)}
                className="w-full max-w-32 bg-text-main rounded-[10px] text-input-default text-[16px] font-bold px-12 py-3 cursor-pointer"
              >
                註冊
              </button>
              <Link
                to="/"
                className="w-full max-w-32 cursor-pointer font-bold py-3 px-12"
              >
                登入
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUp;

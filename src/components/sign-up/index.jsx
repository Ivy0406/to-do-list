import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../api/apiRequest";
import Swal from "sweetalert2";
import AuthVisual from "../key-visual/AuthVisual";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");


  async function handleSignUp(e) {
    e.preventDefault();

    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email.trim()) {
      setEmailError("此欄位不可為空");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Email 格式錯誤");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!nickname.trim()) {
      setNicknameError("此欄位不可為空");
      isValid = false;
    } else {
      setNicknameError("");
    }

    if (!password.trim()) {
      setPasswordError("此欄位不可為空");
      isValid = false;
    } else if (password.trim().length < 6) {
      setPasswordError("密碼至少 6 碼");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("此欄位不可為空");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("兩次密碼輸入不一致");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!isValid) return;

    const dataForSignUp = {
      email: email,
      password: password,
      nickname: nickname,
    };

    try {
      await apiRequest.post("/users/sign_up", dataForSignUp);
      await Swal.fire({
        icon: "success",
        title: "註冊成功",
        text: "請重新登入",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "註冊失敗",
        text: "請再試一次",
      });
      console.log("註冊失敗ＱＱ，錯誤訊息：", error);
    }
  }

  return (
    <main className="bg-primary w-full min-h-dvh flex lg:items-center ">
      <div className="w-full h-full max-w-199 flex flex-col gap-4 px-3 mx-auto lg:flex lg:flex-row lg:justify-between lg:px-0 lg:items-center ">
        <AuthVisual />
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                type="email"
                placeholder="請輸入Email"
                className="bg-input-default rounded-[10px] px-4 py-3"
              ></input>
              {emailError && (
                <p className="text-accent font-bold text-[14px] pt-1.5">
                  {emailError}
                </p>
              )}
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
                onChange={(e) => {
                  setNickname(e.target.value);
                  if (nicknameError) setNicknameError("");
                }}
                type="text"
                placeholder="請輸入暱稱"
                className="bg-input-default rounded-[10px] px-4 py-3"
              ></input>
              {nicknameError && (
                <p className="text-accent font-bold text-[14px] pt-1.5">
                  {nicknameError}
                </p>
              )}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                type="password"
                placeholder="請輸入密碼"
                className="bg-input-default rounded-[10px] px-4 py-3"
              ></input>
              {passwordError && (
                <p className=" text-accent font-bold text-[14px] pt-1.5">
                  {passwordError}
                </p>
              )}
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
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPasswordError) setConfirmPasswordError("");
                }}
                type="password"
                placeholder="請再次輸入密碼"
                className="bg-input-default rounded-[10px] px-4 py-3"
              ></input>
              {confirmPasswordError && (
                <p className=" text-accent font-bold text-[14px] pt-1.5">
                  {confirmPasswordError}
                </p>
              )}
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

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import AuthVisual from "../ui/AuthVisual";
import FormInput from "../ui/FormInput";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {signIn,checkToken} = useAuth();


  useEffect(() => {
   checkToken();
  }, []);

  async function handleSignIn(e) {
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

    if (!password.trim()) {
      setPasswordError("此欄位不可為空");
      isValid = false;
    } else if (password.trim().length < 6) {
      setPasswordError("密碼至少 6 碼");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    const dataForSignIn = {
      email: email,
      password: password,
    };

    signIn(dataForSignIn);
  
  }

  return (
    <main className="bg-primary w-full h-full flex lg:items-center ">
      <div className="w-full h-full max-w-199 flex flex-col gap-4 px-3 mx-auto lg:flex lg:flex-row lg:justify-between lg:px-0 lg:max-h-112 ">
        <AuthVisual />
        <div className="flex flex-col gap-8 lg:gap-6 lg:pt-15.5">
          <h2 className="text-[20px] font-bold text-text-main text-center lg:text-2xl">
            最實用的線上待辦事項服務
          </h2>
          <form className="w-full max-w-76 mx-auto flex flex-col items-center gap-4">
            <FormInput
              id="email"
              label="Email"
              type="email"
              value={email}
              autoComplete="email"
              placeholder="請輸入Email"
              error={emailError}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
            />
            <FormInput
              id="password"
              label="密碼"
              type="password"
              value={password}
              autoComplete=""
              placeholder="請輸入密碼"
              error={passwordError}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
            />
            
            <div className="flex flex-col gap-3">
              <button
                onClick={(e) => handleSignIn(e)}
                className="w-full max-w-32 bg-text-main rounded-[10px] text-input-default text-[16px] font-bold px-12 py-3 cursor-pointer"
              >
                登入
              </button>
              <Link
                to="/signup"
                className="w-full max-w-32 cursor-pointer font-bold py-3 px-12"
              >
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

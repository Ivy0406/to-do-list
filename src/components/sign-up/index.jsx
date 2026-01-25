
import { Link } from "react-router-dom";
import AuthVisual from "../shared/AuthVisual";
import FormInput from "../shared/FormInput";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import { useCheckInputs } from "../../hooks/useCheckInputs";

const SIGN_UP_DEFAULT_VALUES = {
  email: "",
  nickname: "",
  password: "",
  confirmPassword: "", 
};


const SignUp = () => {
  const {signUp} = useAuth();
  const {values:signUpData ,handleChange: updateField} = useForm(SIGN_UP_DEFAULT_VALUES);
  const {errors, validate, clearErrors} = useCheckInputs();

  function handleInputChange (e){
    const fieldId = e.target.id;
    updateField(e);
    clearErrors(fieldId);
  }

  async function handleSignUp(e) {
    e.preventDefault();

    let isValid = validate(signUpData);
    if (!isValid) return;

    const dataForSignUp = {
      email: signUpData.email,
      password: signUpData.password,
      nickname: signUpData.nickname,
    };

    await signUp(dataForSignUp);
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
            <FormInput
              id="email"
              label="Email"
              type="email"
              value={signUpData.email}
              autoComplete="email"
              placeholder="請輸入Email"
              error={errors.email}
              onChange={handleInputChange}
            />
            <FormInput
              id="nickname"
              label="您的暱稱"
              type="text"
              value={signUpData.nickname}
              autoComplete="username"
              placeholder="請輸入暱稱"
              error={errors.nickname}
              onChange={handleInputChange}
            />

            <FormInput
              id="password"
              label="密碼"
              type="password"
              value={signUpData.password}
              autoComplete=""
              placeholder="請輸入密碼"
              error={errors.password}
              onChange={handleInputChange}
            />

            <FormInput
              id="confirmPassword"
              label="再次輸入密碼"
              type="password"
              value={signUpData.confirmPassword}
              autoComplete=""
              placeholder="請再次輸入密碼"
              error={errors.confirmPassword}
              onChange={handleInputChange}
            />

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

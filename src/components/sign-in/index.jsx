import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import AuthVisual from "../ui/AuthVisual";
import FormInput from "../ui/FormInput";
import {useForm} from "../../hooks/useForm";
import {useCheckInputs} from "../../hooks/useCheckInputs";

const SIGN_IN_DEFAULT_VALUES = {
  email: "",
  password: "",
};

const SignIn = () => {
  const {values:signInData ,handleChange: updateField} = useForm(SIGN_IN_DEFAULT_VALUES);
  const {errors, validate, clearErrors} = useCheckInputs();
  const {signIn,checkToken} = useAuth();


  useEffect(() => {
   checkToken();
  }, [checkToken]);

  function handleInputChange (e){
    const fieldId = e.target.id;
    updateField(e);
    clearErrors(fieldId);
  }

  async function handleSignIn(e) {
    e.preventDefault();
    let isValid = validate(signInData);
    if (!isValid) return;

    const dataForSignIn = {
      email: signInData.email,
      password: signInData.password,
    };

    await signIn(dataForSignIn);
  
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
              value={signInData.email}
              autoComplete="email"
              placeholder="請輸入Email"
              error={errors.email}
              onChange={handleInputChange}
            />
            <FormInput
              id="password"
              label="密碼"
              type="password"
              value={signInData.password}
              autoComplete=""
              placeholder="請輸入密碼"
              error={errors.password}
              onChange={handleInputChange}
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

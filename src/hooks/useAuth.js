import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import apiRequest from "../api/apiRequest";
import Swal from "sweetalert2";

export const useAuth = () => {
  const navigate = useNavigate();

  const signIn = async (dataForSignIn) => {
    try {
      const res = await apiRequest.post("/users/sign_in", dataForSignIn);
      const { token, exp, nickname } = res.data;
      const expDate = new Date(exp * 1000);
      Cookies.set("todoUserToken", token, {
        expires: expDate,
        path: "/",
      });
      localStorage.setItem("todoUserNickname", nickname);
      await Swal.fire({
        icon: "success",
        title: "登入成功",
        text: "歡迎回來！",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/todos");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "登入失敗",
        text: "帳號或密碼錯誤，請再試一次",
      });
      console.log("登入失敗了ＱＱ，請檢查錯誤訊息：", error);
    }
  };

  const signUp = async (dataForSignUp) => {
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
  };

  const checkToken = async () => {
    const token = Cookies.get("todoUserToken");
    if (!token) {
      return;
    }
    try {
      await apiRequest.get("/users/checkout");
      await Swal.fire({
        icon: "success",
        title: "歡迎回來",
        text: "即將前往您的待辦清單",
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      navigate("/todos");
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "連線逾時",
        text: "請重新登入",
        timer: 1500,
        showConfirmButton: false,
      });
      Cookies.remove("todoUserToken");
      localStorage.removeItem("todoUserNickname");
      console.log("驗證失敗ＱＱ，錯誤訊息：", error);
    }
  };

  const signOut = async () => {
    try {
      await apiRequest.post("/users/sign_out");
      Cookies.remove("todoUserToken");
      localStorage.removeItem("todoUserNickname");
      await Swal.fire({
        icon: "success",
        title: "已登出",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.log("登出失敗Ｑ＿Ｑ", error);
      Cookies.remove("todoUserToken");
      localStorage.removeItem("todoUserNickname");
      navigate("/");
    }
  };

  return { signIn, signUp, checkToken, signOut };
};

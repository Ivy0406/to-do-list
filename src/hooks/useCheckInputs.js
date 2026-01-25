import { useState } from "react";

export const useCheckInputs = () => {
    const [errors, setErrors] = useState({});
    const validate = (values) => {
        const newErrors = {};
        let isValid = true;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isEmailEmpty = !values.email.trim();
        const isEmailInvalid = !emailRegex.test(values.email);

        const isNicknameEmpty = !values.nickname.trim();

        const isPasswordEmpty = !values.password.trim();
        const isPasswordTooShort = values.password.trim().length < 6;

        const isConfirmPasswordEmpty = !values.confirmPassword.trim();
        const isPasswordMismatch = values.confirmPassword !== values.password;
        
        if (isEmailEmpty) {
            newErrors.email = "此欄位不可為空";
            isValid = false;
        } else if (isEmailInvalid) {
            newErrors.email = "Email 格式錯誤";
            isValid = false;
        }   else {
            newErrors.email = "";
        }

        if (isNicknameEmpty) {
            newErrors.nickname = "此欄位不可為空";
            isValid = false;
        } else {
            newErrors.nickname = "";
        }

        if (isPasswordEmpty) {
            newErrors.password = "此欄位不可為空";
            isValid = false;
        } else if (isPasswordTooShort) {
            newErrors.password = "密碼至少 6 碼";
            isValid = false;
        } else {
            newErrors.password = "";
        }

        if (isConfirmPasswordEmpty) {
            newErrors.confirmPassword = "此欄位不可為空";
            isValid = false;
        } else if (isPasswordMismatch) {
            newErrors.confirmPassword = "兩次密碼輸入不一致";
            isValid = false;
        } else {
            newErrors.confirmPassword = "";
        }

        setErrors(newErrors);
        return isValid;
    }
    const clearErrors = (fieldId) => {
        setErrors((prev) => ({ ...prev, [fieldId]: "" }));
    };

    return { errors, validate, clearErrors}
}
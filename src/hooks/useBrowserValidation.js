import { useState } from "react";
import validator from "validator";

export function useBrowserValidation(currentName, currentEmail) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const setRequiredError = (name) => {
    setErrors({ ...errors, [name]: "Это обязательное поле" });
  };
  const validate = (name, value) => {
    switch (name) {
      case "film-query":
        if (value.length === 0 || value.length === undefined) {
          setErrors({ ...errors, [name]: "Запрос не может быть пустым" });
        } else if (!new RegExp(/^[а-яА-ЯёЁa-zA-Z]+$/).test(value)) {
          setErrors({ ...errors, [name]: "Нужно ввести ключевое слово" });
        }
        break;
      case "name":
        if (value === currentName) {
          setErrors({ ...errors, [name]: "!!!" })
          setIsFormValid(false)
        } else if (value.length === 0) {
          setRequiredError(name);
          setIsFormValid(false)
        } else if (value.length < 2) {
          setErrors({
            ...errors,
            [name]: "Минимальное количество символов — 2",
          });
          setIsFormValid(false)
        } else if (value.length >= 30) {
          setErrors({
            ...errors,
            [name]: "Максимальное количество символов — 30",
          });
          setIsFormValid(false)
        } else if (!new RegExp(/^[а-яА-ЯёЁa-zA-Z\s/-]+$/).test(value)) {
          setErrors({
            ...errors,
            [name]: "Используйте буквы, дефис или пробел",
          });
          setIsFormValid(false)
        } else {
          setIsFormValid(true)
        }
        break;
      case "email":
        if (value === currentEmail) {
          setErrors({ ...errors, [name]: "" })
          setIsFormValid(false)
        } else if (value.length === 0) {
          setRequiredError(name);
          setIsFormValid(false)
        } else if (!validator.isEmail(value)) {
          setErrors({
            ...errors,
            [name]: "Некорректный адрес электронной почты",
          });
          setIsFormValid(false)
        } else {
          setIsFormValid(true)
        }
        break;
      case "password":
        if (value.length === 0) {
          setRequiredError(name);
        } else if (value.length < 8) {
          setErrors({
            ...errors,
            [name]: "Минимальная длина пароля — 8 символов",
          });
        }
        break;
      default:
        break;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validate(name, value);
  };
  return {
    values,
    errors,
    handleChange,
    setValues,
    isFormValid,
    setIsFormValid,
  };
}

export default useBrowserValidation;
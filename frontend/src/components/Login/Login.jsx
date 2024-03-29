import React from "react";


import TextButton from "../Button/TextButton/TextButton";
import Input from "../Input/Input";
import InputForm from "../InputForm/InputForm";
import InputFormHeading from "../InputForm/InputFormHeading";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/user/userActions";
import {
  selectLoginError,
  selectLoginStart,
} from "../../store/user/userSelector";

export default function Login() {
  const state = useSelector((state) => state);
  let loginError = selectLoginError(state);
  let loginStart = selectLoginStart(state);
  const dispatch = useDispatch();
  const [emailOrPhone, setEmailOrPhone] = useState(null);
  const [password, setPassword] = useState(null);

  const handelFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(emailOrPhone, password));
    // dispatc login action
    // handel err
  };
  return (
    <div className="login-comp">
      <div className="user-form ">
        <InputForm className="login-form" onSubmit={handelFormSubmit}>
          <InputFormHeading
            heading="Sign in to Twitter"
            className="login-form-heading"
          />
          
          
          <Input
            focused={emailOrPhone}
            type="email"
            placeholder="Email, phone or username"
            required
            disabled={loginStart}
            className="login-form-input"
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
          <Input
            focused={password}
            type="password"
            placeholder="Password"
            required
            disabled={loginStart}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <p className="login-error-message">{loginError}</p>}
          <TextButton
            type="submit"
            bcBlue
            rounded
            disabled={!emailOrPhone || !password || loginStart}
            loading={loginStart}
            className="flow-login-btn"
          >
            Login
          </TextButton>
          <TextButton type="button" rounded>
            Forget password
          </TextButton>
          <div className="signup-option">
            <p className="signup-option-text">Don't have an account?</p>
            <Link to="/" className="default-link">
              Sign up
            </Link>
          </div>
        </InputForm>
      </div>
    </div>
  );
}

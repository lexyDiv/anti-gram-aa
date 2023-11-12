import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { userLoganisation } from "./functions/userLoganisation";

function Loginisation({
  screen,
}: {
  screen: { width: number; height: number };
}): JSX.Element {
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const inputNick = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const height = screen.height <= 600 ? screen.height / 10 : screen.height / 15;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <form action="POST" id="pers-form" onSubmit={(e) => e.preventDefault()}>
      <div
        className="pers-form-line"
        style={{ margin: `${screen.height / 70}px`, height: `${height}px` }}
      >
        <input
          type="text"
          className="pers-form-line-input"
          placeholder="Ник"
          autoComplete="username"
          ref={inputNick}
          onClick={() => {
            setMessage("");
          }}
        />
        <div id="pers-nik-status"></div>
      </div>

      <div
        className="pers-form-line"
        style={{ margin: `${screen.height / 70}px`, height: `${height}px` }}
      >
        <input
          type={!showPass ? "password" : "text"}
          autoComplete="current-password"
          className="pers-form-line-input"
          placeholder="Пароль"
          ref={inputPassword}
        />
        <img
          className="pers-form-eye"
          src="https://static.vecteezy.com/system/resources/previews/009/973/675/non_2x/eye-icon-sign-symbol-design-free-png.png"
          alt="img"
          style={{ borderColor: `${!showPass ? "rgb(48, 59, 59)" : "green"}` }}
          onClick={() => {
            setShowPass((prev) => !prev);
          }}
        />
      </div>

      <button
        type="submit"
        id="pers-form-submit"
        className="pers-form-item"
        style={{
          marginTop: `${screen.height / 30}px`,
          height: `${
            screen.height <= 400 ? screen.height / 10 : screen.height / 15
          }px`,
        }}
        onClick={() => {
          userLoganisation({
            inputNick,
            inputPassword,
            setMessage,
            dispatch,
            navigate,
          });
        }}
      >
        войти
      </button>
      <div
        id="pers-form-message"
        className="pers-form-item"
        style={{
          marginTop: `${screen.height / 30}px`,
          height: "20%",
        }}
      >
        <h5>{message}</h5>
      </div>
    </form>
  );
}

export default Loginisation;

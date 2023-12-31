import React, { useRef, useState } from "react";
import { regFotoInOutOrder } from "./functions/regFotoInOutOrder";
import { inputOutDefault } from "./functions/inputOutDefault";
import { checkNick } from "../../functions/checkNick";
import { userRegisration } from "./functions/userRegisration";
import { RootState, useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Registration({
  screen,
}: {
  screen: { width: number; height: number };
}): JSX.Element {
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [fotoType, setFotoType] = useState("out");
  const [nickValid, setNickValid] = useState("");
  const inputNick = useRef<HTMLInputElement>(null);
  const inputIn = useRef<HTMLInputElement>(null);
  const inputOut = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);
  const height = screen.height <= 600 ? screen.height / 10 : screen.height / 15;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { images } = useSelector((state: RootState) => state.listing);

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
          onChange={() => checkNick({ inputNick, setNickValid, setMessage })}
          onClick={() => {
            setMessage("");
          }}
        />
        <div id="pers-nik-status">
          {inputNick.current && inputNick.current.value.length ? (
            <img
              id="pers-stop"
              src={
                nickValid === "bad"
                  ? images.stop
                  : nickValid === "ok"
                  ? images.green
                  : images.loading
              }
              alt="img"
              onClick={() => {
                setMessage("");
              }}
            />
          ) : (
            false
          )}
        </div>
      </div>

      <div
        className="pers-form-line"
        style={{ margin: `${screen.height / 70}px`, height: `${height}px` }}
      >
        <input
          type="text"
          className="pers-form-line-input"
          placeholder="Аватарка"
          ref={inputOut}
          autoComplete="username"
          onChange={() => {
            inputOutDefault({ inputIn, inputOut, setFotoType });
          }}
          onClick={() => {
            setMessage("");
          }}
        />

        <label className="input-file">
          <div>
            <input
              id="file"
              type="file"
              name="file"
              ref={inputIn}
              multiple
              required
              onChange={() => {
                regFotoInOutOrder({
                  setMessage,
                  inputOut,
                  inputIn,
                  setFotoType,
                });
              }}
              onClick={() => {
                setMessage("");
              }}
            />
            <img
              className="pers-form-eye"
              src={images.addImage}
              alt="img"
              style={{
                borderColor: `${
                  fotoType === "out" ? "rgb(48, 59, 59)" : "green"
                }`,
              }}
              onClick={() => {
                setMessage("");
              }}
            />
          </div>
        </label>
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
          src={images.eye}
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
          userRegisration({
            nickValid,
            inputPassword,
            inputNick,
            inputIn,
            inputOut,
            setMessage,
            dispatch,
            navigate,
          });
        }}
      >
        зарегистрироваться
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

export default Registration;

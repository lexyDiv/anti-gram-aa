import React, { useRef, useState } from "react";
import { checkNewChatName } from "./functions/checkNewChatName";
import { newChatFotoValid } from "./functions/newChatFotoValid";
import { newChatPasswordValid } from "./functions/newChatPasswordValid";
import { Socket } from "socket.io-client";
import { newChatFetch } from "./functions/newChatFetch";
import { RootState, useAppDispatch } from "../../../store";
import { useSelector } from "react-redux";

function NewChatPoint({
  socket,
  setMenu,
}: {
  socket: Socket;
  setMenu: (value: boolean) => void;
}): JSX.Element {
  const nameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [fotoValid, setFotoValid] = useState(false);
  const fotoInput = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [nameValide, setNameValid] = useState("bad");
  const [status, setStatus] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <div id="users-box" className="new-chat" onClick={() => setMessage("")}>
      <div className="new-chat-line">
        <input
          type="text"
          placeholder="название"
          ref={nameInput}
          onChange={() => {
            checkNewChatName({ setMessage, nameInput, setNameValid });
          }}
        />
        {nameInput.current && (
          <div className="new-chat-image-box">
            {nameInput.current && nameInput.current.value && (
              <img
                id="pers-stop"
                src={
                  nameValide === "bad"
                    ? "https://www.onlygfx.com/wp-content/uploads/2019/06/6-red-grunge-prohibition-sign-5.png"
                    : nameValide === "ok"
                    ? "https://www.pngarts.com/files/10/Check-Mark-Free-PNG-Image.png"
                    : "https://vektor-penza.ru/catalog/view/image/loading.gif"
                }
                alt="img"
                onClick={() => {
                  setMessage("");
                }}
              />
            )}
          </div>
        )}
      </div>
      <div className="new-chat-line">
        <input
          type="text"
          placeholder="ссылка на фотку"
          ref={fotoInput}
          onChange={() => {
            newChatFotoValid({ setMessage, fotoInput, setFotoValid });
          }}
        />
        {fotoInput.current && (
          <div className="new-chat-image-box">
            {fotoInput.current && fotoInput.current.value && (
              <img
                id="pers-stop"
                src={
                  !fotoValid
                    ? "https://www.onlygfx.com/wp-content/uploads/2019/06/6-red-grunge-prohibition-sign-5.png"
                    : "https://www.pngarts.com/files/10/Check-Mark-Free-PNG-Image.png"
                }
                alt="img"
                onClick={() => {
                  setMessage("");
                }}
              />
            )}
          </div>
        )}
      </div>
      <div className="new-chat-line">
        <input
          type="checkBox"
          style={{ width: "20px", height: "20px", margin: "10px" }}
          onChange={() => setStatus((prev) => !prev)}
        />
        <div style={{ display: "flex", marginTop: "18px" }}>
          <p>статус :</p>
          {status ? (
            <p style={{ color: "green", fontStyle: "italic" }}>открытый</p>
          ) : (
            <p style={{ color: "red", fontStyle: "italic" }}>закрытый</p>
          )}
        </div>
      </div>
      {!status && (
        <div className="new-chat-line">
          <input
            type="text"
            placeholder="пароль чата"
            ref={passwordInput}
            onChange={() => {
              newChatPasswordValid({
                setMessage,
                passwordInput,
                setPasswordValid,
              });
            }}
          />
          {fotoInput.current && (
            <div className="new-chat-image-box">
              <img
                id="pers-stop"
                src={
                  !passwordValid
                    ? "https://www.onlygfx.com/wp-content/uploads/2019/06/6-red-grunge-prohibition-sign-5.png"
                    : "https://www.pngarts.com/files/10/Check-Mark-Free-PNG-Image.png"
                }
                alt="img"
                onClick={() => {
                  setMessage("");
                }}
              />
            </div>
          )}
        </div>
      )}
      <div className="new-chat-line" style={{ justifyContent: "center" }}>
        {(status || (!status && passwordValid)) && nameValide && fotoValid && (
          <button
            onClick={() => {
              newChatFetch({
                passwordInput,
                nameInput,
                fotoInput,
                socket,
                setMenu,
                dispatch,
                user,
              });
            }}
          >
            создать
          </button>
        )}
      </div>
      <div className="new-chat-line">
        <p style={{ color: "red" }}>{message}</p>
      </div>
    </div>
  );
}

export default NewChatPoint;

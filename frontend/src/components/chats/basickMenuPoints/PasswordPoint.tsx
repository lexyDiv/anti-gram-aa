import React, { useState } from "react";
import { changePassword } from "../../../functions/changePassword";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

function PasswordPoint({
  setMenuLoading,
}: {
  setMenuLoading: (value: boolean) => void;
}): JSX.Element {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [userInfoErr, setUserInfoErr] = useState("");
  const [complite, setComplite] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <form
      action=""
      id="point-password-form"
      onClick={() => {
        setUserInfoErr("");
      }}
      onSubmit={(e) => {
        e.preventDefault();
        user &&
          changePassword({
            password,
            newPassword,
            setUserInfoErr,
            userId: user.id,
            setComplite,
            setMenuLoading,
          });
      }}
    >
      {!complite ? (
        <>
          <div>
            <p>старый пароль</p>
            <img
              style={{
                borderColor: `${showPass ? "green" : "rgba(38, 41, 41)"}`,
              }}
              src="https://static.vecteezy.com/system/resources/previews/009/973/675/non_2x/eye-icon-sign-symbol-design-free-png.png"
              alt="img"
              onClick={() => {
                setShowPass((prev) => !prev);
              }}
            />
          </div>
          {!showPass ? (
            <input
              type="password"
              value={password}
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          ) : (
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <div
            style={{
              borderColor: `${showNewPass ? "green" : "rgba(38, 41, 41)"}`,
            }}
          >
            <p>новый пароль</p>
            <img
              style={{
                borderColor: `${showNewPass ? "green" : "rgba(38, 41, 41)"}`,
              }}
              src="https://static.vecteezy.com/system/resources/previews/009/973/675/non_2x/eye-icon-sign-symbol-design-free-png.png"
              alt="img"
              onClick={() => {
                setShowNewPass((prev) => !prev);
              }}
            />
          </div>
          {!showNewPass ? (
            <input
              type="password"
              value={newPassword}
              autoComplete="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          ) : (
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          )}
          <button type="submit">изменить</button>
          <div id="pass-point-form-info">
            {userInfoErr && (
              <p style={{ color: "red", marginTop: "0px" }}>{userInfoErr}</p>
            )}
          </div>
        </>
      ) : (
        <div id="pass-point-form-info" style={{ height: "100%" }}>
          <p style={{ color: "green", marginTop: "0px" }}>
            пароль успешно изменён!
          </p>
        </div>
      )}
    </form>
  );
}

export default PasswordPoint;

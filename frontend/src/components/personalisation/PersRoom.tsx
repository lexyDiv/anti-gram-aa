import React, { useEffect, useRef, useState } from "react";
import "./PersRoom.css";
import { RootState, useAppDispatch } from "../../store";
import GlobalLoading from "../loadings/GlobalLoading";
import Registration from "./Registration";
import Loginisation from "./Loginisation";
import { useSelector } from "react-redux";
import { changeLoad } from "../chats/slices/listingSlice";
import { useNavigate } from "react-router-dom";

function PersRoom(): JSX.Element {
  const [way, setWay] = useState("");
  const persRoomBody = useRef<HTMLDivElement>(null);
  const [gab, setGab] = useState({ width: 1, height: 1 });
  const [show, setShow] = useState(false);
  const [screen, setScrren] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { loading } = useSelector((state: RootState) => state.listing);
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScrren({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
    setTimeout(() => {
      persRoomBody.current && setGab({ width: 90, height: 90 });
    }, 20);
    setTimeout(() => {
      setShow(true);
    }, 820);
    dispatch(changeLoad(true));
    user && navigate('/chats');
  }, []);

  return (
    <>
      <div id="pers-room">
        <div
          id="pers-room-body"
          ref={persRoomBody}
          style={{ width: `${gab.width}%`, height: `${gab.height}%` }}
        >
          {way && (
            <h5
              onClick={() => setWay("")}
              id="pers-room-back"
            >{`< < назад`}</h5>
          )}
          {show && !way && (
            <>
              <div id="pers-room-info">
                <p>Сервис для общения</p>
                <h5 id="prg">Anti-gram</h5>
                <div id="base-text">
                  <p>
                    Зарегистрированные пользователи могут создавать чаты,
                    находить знакомых, заводить друзей, размещять посты,
                    обмениваться ссылками, сообщениями, оставлять комментарии и
                    так далее.
                  </p>
                </div>
              </div>
              <div id="base-select">
                <p
                  onClick={() => {
                    setWay("log");
                  }}
                >
                  войти
                </p>
                <p
                  onClick={() => {
                    setWay("reg");
                  }}
                >
                  зарегистрироваться
                </p>
              </div>
            </>
          )}
          {way === "reg" && <Registration screen={screen} />}
          {way === "log" && <Loginisation screen={screen} />}
        </div>

        {!loading && <GlobalLoading />}
      </div>
    </>
  );
}

export default PersRoom;

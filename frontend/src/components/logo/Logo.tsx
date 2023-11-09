import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Logo.css";
import Fone from "./Fone";
import { RootState, useAppDispatch } from "../../store";
import { moveLiteras } from "./slices/logoSlice";
import { useSelector } from "react-redux";
import { getValidUser } from "../../functions/getValidUser";
import { changeLoad } from "../chats/slices/listingSlice";

function Logo(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const { user } = useSelector((state: RootState) => state.user);
  const actualUser = useRef(user);
  actualUser.current = user;

  useEffect(() => {
    if(!actualUser.current) {
      const interval = setInterval(() => {
        setWidth(window.innerWidth);
      }, 100);
      setTimeout(() => {
        dispatch(moveLiteras());
      }, 100);
      setTimeout(() => {
        dispatch(changeLoad(false));
        getValidUser({ dispatch, navigate });
      }, 2200);
      return () => clearInterval(interval);
    } else {
      navigate('/chats');
    }
  }, []);

  return (
    <div>
      {!actualUser.current && <Fone width={width} />}
    </div>
  );
}

export default Logo;

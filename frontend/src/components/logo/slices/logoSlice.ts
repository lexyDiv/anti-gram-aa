import { createSlice } from "@reduxjs/toolkit";
import { StateLitera } from "../types/StateLItera";

const initialState: StateLitera = {
  literas: [
    {
      top: -25,
      left: -25,
      stringLeft: 10,
      stringTop: 33,
      litera: "A",
      color: "violet",
      stringColor: "rgb(212, 193, 82)",
      id: 1,
    },
    {
      top: 100,
      left: -20,
      stringLeft: 17,
      stringTop: 33,
      litera: "n",
      color: "violet",
      stringColor: "rgb(212, 193, 82)",
      id: 2,
    },
    {
      top: 80,
      left: 100,
      stringLeft: 24,
      stringTop: 33,
      litera: "t",
      color: "violet",
      stringColor: "rgb(212, 193, 82)",
      id: 3,
    },
    {
      top: 80,
      left: 100,
      stringLeft: 28,
      stringTop: 33,
      litera: "i",
      color: "violet",
      stringColor: "rgb(212, 193, 82)",
      id: 4,
    },
    {
      top: 80,
      left: 100,
      stringLeft: 30,
      stringTop: 33,
      litera: "-",
      color: "violet",
      stringColor: "rgb(212, 193, 82)",
      id: 5,
    },
    {
      top: 80,
      left: 100,
      stringLeft: 33.5,
      stringTop: 33,
      litera: "g",
      color: "violet",
      stringColor: "rgb(212, 193, 82)",
      id: 6,
    },
    {
      top: 80,
      left: 100,
      stringLeft: 39.5,
      stringTop: 33,
      litera: "r",
      color: "violet",
      stringColor: "rgb(212, 193, 82)",
      id: 7,
    },
    {
      top: 80,
      left: 100,
      stringLeft: 43,
      stringTop: 33,
      litera: "a",
      color: "violet",
      stringColor: "rgb(212, 193, 82)",
      id: 8,
    },
    {
      top: 80,
      left: 100,
      stringLeft: 47.3,
      stringTop: 33,
      litera: "m",
      color: "violet",
      stringColor: "rgb(212, 193, 82)",
      id: 0,
    },
  ],
};

initialState.literas.forEach((litera, i) => (litera.id = i + 1));

const logoSlice = createSlice({
  name: "logo",
  initialState,
  reducers: {
    getLiteras: (state) => state,
    moveLiteras: (state) => {
      state.literas.forEach((litera) => {
        litera.top = litera.stringTop;
        litera.left = litera.stringLeft;
        litera.color = litera.stringColor;
      });
    },
  },
});

export const { getLiteras, moveLiteras } = logoSlice.actions;
export default logoSlice.reducer;

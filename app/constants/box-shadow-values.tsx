import { BoxShadowI, Template, TextShadow } from "../types/index.type";

export const initialBoxShadow: BoxShadowI[] = [
  {
    shiftRight: 0,
    shiftDown: 19,
    spread: 3,
    blur: 7,
    color:  {
        hue: 120,
        brightness: 0,
        saturation: 1,
      },
    inset: false,
    id: 0,
  },
];
export const Templates: Template[] = [
  {
    template: [
      {
        shiftRight: 10,
        shiftDown: 10,
        spread: 0,
        blur: 0,
  
        color: {
          hue: 185.37313432835822,
          brightness: 0.5625,
          saturation: 1,
        },
        inset: false,
        id: 0,
      },
      {
        shiftRight: 20,
        shiftDown: 20,
        spread: 0,
        blur: 0,
        color: {
          hue: 185.37313432835822,
          brightness: 0.725,
          saturation: 0.81875,
        },
        inset: false,
        id: 1,
      },
      {
        shiftRight: 30,
        shiftDown: 30,
        spread: 0,
        blur: 0,
        color: {
          hue: 185.37313432835822,
          brightness: 0.86875,
          saturation: 0.6875,
        },
        inset: false,
        id: 2,
      },
    ],
    id: 0,
  },
  {
    template: [
      {
        shiftRight: 15,
        shiftDown: 19,
        spread: 10,
        blur: 10,
        color: {
          hue: 120,
          brightness: 1,
          saturation: 1,
        },
        inset: false,
        id: 0,
      },
      {
        shiftRight: 20,
        shiftDown: 19,
        spread: 20,
        blur: 10,
        color: {
          hue: 120,
          brightness: 1,
          saturation: 1,
        },
        inset: false,
        id: 1,
      },
    ],
    id: 1,
  },
];
export const initialTextShadow: TextShadow[] = [
  {
    shiftRight: 0,
    shiftDown: 19,
    blur: 0,
    color:  {
        hue: 120,
        brightness: 1,
        saturation: 1,
      },
    id: 0,
  },
];

export interface BoxShadowI {
  shiftRight: number;
  shiftDown: number;
  spread: number;
  blur: number;
  opacity: number;
  color: any;
  inset: boolean;
  id: any;
}
export interface Template {
  template: BoxShadowI[];
  id: number;
}
export interface TextShadow {
  shiftRight: number;
  shiftDown: number;
  blur: number;
  opacity: number;
  color: any;
  id: any;
}

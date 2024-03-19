import { atom } from "recoil";

export const userInfo = atom({
  key: "userInfo",
  default: null,
});

export const projectInfo = atom({
  key: "projectInfo",
  default: null,
});

export const projectDrag = atom({
  key: "projectDrag",
  default: true,
});

export const selectRowId = atom({
  key: "selectRowId",
  default: null,
});

export const selectBlockId = atom({
  key: "selectBlockId",
  default: null,
});

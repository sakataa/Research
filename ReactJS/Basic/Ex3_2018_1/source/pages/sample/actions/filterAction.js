import { TOGGLE_SAMPLE } from "./types";

export const toggleSample = data => {
  return {
    type: TOGGLE_SAMPLE,
    data
  };
};

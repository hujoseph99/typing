import { JOIN_GAME, RETURN_MENU } from "./types";

export const joinGame = () => dispatch => {
  dispatch({
    type: JOIN_GAME
  });
};

export const returnMenu = () => dispatch => {
  dispatch({
    type: RETURN_MENU
  });
};
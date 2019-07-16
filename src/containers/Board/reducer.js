import { createAction } from 'redux-actions';

import Constants from '../App/constants';
import Box from './Box';

export const BOX_ACTION = 'BOX_ACTION';
export const SET_BOARD_DATA = 'SET_BOARD_DATA';

const initialState = {
  board: new Array(Constants.NO_ROWS).fill(0)
    .map((r, ri) => new Array(Constants.NO_COLS).fill(0)
      .map((c, ci) => new Box(ri, ci))),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD_DATA:
      return {
        ...state,
        board: action.payload.board,
      };
    default:
      return state;
  }
};

export const boxAction = createAction(BOX_ACTION);

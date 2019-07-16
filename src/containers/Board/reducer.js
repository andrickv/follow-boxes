import { createAction } from 'redux-actions';

import Constants from '../App/constants';

export const INIT = 'INIT';
export const INIT_DONE = 'INIT_DONE';

const initialState = {
  board: new Array(Constants.NO_ROWS).fill(0)
    .map(() => new Array(Constants.NO_COLS).fill(0)),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        init: action.payload.init,
      };
    default:
      return state;
  }
};

export const init = createAction(INIT);

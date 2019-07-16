import { createAction } from 'redux-actions';

export const INIT = 'INIT';
export const INIT_DONE = 'INIT_DONE';

const initialState = {
  board: new Array(10).fill(0).map(() => new Array(10).fill(0)),
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

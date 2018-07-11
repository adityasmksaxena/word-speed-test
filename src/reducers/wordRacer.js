import { SAVE_WORDLIST } from '../actions/types';

const INITIAL_STATE = {
  startTime: '',
  wordList: [],
};
const wordRacerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_WORDLIST: {
      return state;
    }
    default: return state;
  }
};

export default wordRacerReducer;

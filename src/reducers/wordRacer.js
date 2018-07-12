import {SAVE_PARALIST, START_RACE, CHANGE_FOCUS, UPDATE_LEARNED_INPUT} from '../actions/types';

const INITIAL_STATE = {
  raceStartTime: '',
  paraList: [],
  learnedInput: [],
  inFocus: 0,
  wordCnt: 0,
};
const wordRacerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_PARALIST: {
      const { paraList } = action.payload;
      const learnedInput = paraList.map(() => '');
      return { ...state, paraList, learnedInput };
    }
    case START_RACE: {
      return { ...state, raceStartTime: Date.now() }
    }
    case CHANGE_FOCUS: {
      return { ...state, inFocus: state.inFocus + 1 };
    }
    case UPDATE_LEARNED_INPUT: {
      const { inFocus, newVal } = action.payload;
      const learnedInput = [...state.learnedInput];
      learnedInput[inFocus] = newVal;
      return { ...state, learnedInput, wordCnt: state.wordCnt + 1 }
    }
    default: return state;
  }
};

export default wordRacerReducer;

import {CHANGE_FOCUS, SAVE_PARALIST, START_RACE, UPDATE_LEARNED_INPUT} from './types';

const savePara = (paraList) => ({
  type: SAVE_PARALIST,
  payload: { paraList },
});
const startRace = () => ({
  type: START_RACE,
});
const changeFocus = () => ({
  type: CHANGE_FOCUS,
});
const updateLearnedInput = (inFocus, newVal) => ({
  type: UPDATE_LEARNED_INPUT,
  payload: { inFocus, newVal },
});

export const DashboardActions = { savePara, startRace, changeFocus, updateLearnedInput };

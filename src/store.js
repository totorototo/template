import { combineReducers } from "redux";

const ERROR_RECEIVE = "ERROR_RECEIVE";
const BRANCH_REQUEST = "BRANCH_REQUEST";
const BRANCH_RECEIVE = "BRANCH_RECEIVE";
const BRANCH_SELECT = "BRANCH_SELECT";

export const actionTypes = {
  ERROR_RECEIVE,
  BRANCH_REQUEST,
  BRANCH_RECEIVE,
  BRANCH_SELECT
};

const receiveError = payload => ({
  type: ERROR_RECEIVE,
  payload
});

const requestBranch = payload => ({
  type: BRANCH_REQUEST,
  payload
});

const receiveBranch = payload => ({
  type: BRANCH_RECEIVE,
  payload
});

const selectBranch = payload => ({
  type: BRANCH_SELECT,
  payload
});

export const actionCreators = {
  receiveError,
  receiveBranch,
  requestBranch,
  selectBranch
};

const branches = (state = {}, action) => {
  switch (action.type) {
    case BRANCH_RECEIVE: {
      return {
        ...state,
        [action.payload.name]: action.payload
      };
    }

    default: {
      return state;
    }
  }
};

const active = (state = null, action) => {
  switch (action.type) {
    case BRANCH_REQUEST: {
      return null;
    }

    case BRANCH_RECEIVE: {
      return action.payload.name;
    }

    case BRANCH_SELECT: {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};

const getBranches = state => state.branches;
const getBranch = name => state => getBranches(state)[name];
const getActive = state => state.active;

export const selectors = {
  getActive,
  getBranch,
  getBranches
};

export default combineReducers({ branches, active });

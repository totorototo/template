import { combineReducers } from "redux";

const LOCATION_REQUEST = "LOCATION_REQUEST";
const LOCATION_RECEIVE = "LOCATION_RECEIVE";

export const actionTypes = {
  LOCATION_REQUEST,
  LOCATION_RECEIVE
};

const requestLocation = payload => ({
  type: LOCATION_REQUEST,
  payload
});

const receiveLocation = payload => ({
  type: LOCATION_RECEIVE,
  payload
});

export const actionCreators = {
  requestLocation,
  receiveLocation
};

const location = (state = {}, action) => {
  switch (action.type) {
    case LOCATION_RECEIVE: {
      return {
        ...state,
        ...action.payload
      };
    }

    default: {
      return state;
    }
  }
};

const getLocation = state => state.location;

export const selectors = {
  getLocation
};

export default combineReducers({ location });

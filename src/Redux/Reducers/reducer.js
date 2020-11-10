const initialState = {
  user: { },
  video: { }
}

const GET_USER = 'GET_USER',
CLEAR_USER = 'CLEAR_USER',
GET_VIDEO = 'GET_VIDEO',
CLEAR_VIDEO = 'CLEAR_VIDEO'

export function getUser(userObj) {
  return {
    type: GET_USER,
    payload: userObj
  }
}

export function clearUser(){
  return {
      type: CLEAR_USER,
      payload: {}
  }
}

export function getVideo(videoObj){
  return {
    type: GET_VIDEO,
    payload: videoObj
  }
}

export function clearVideo(){
  return {
    type: CLEAR_VIDEO,
    payload: {}
  }
}

export default function reducer(state = initialState, action){
  const {type, payload} = action;

  switch(type){
      case GET_USER:
          return {...state, user: payload};
      case CLEAR_USER:
          return {...state, user: payload};
      case GET_VIDEO:
          return {...state, video: payload};
      case CLEAR_VIDEO:
          return {...state, video: payload};
      default:
          return state;
  }
}
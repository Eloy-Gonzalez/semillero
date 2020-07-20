import { Map } from 'immutable'

import {
  SET_VIDEOS,
  CLEAR_VIDEOS
} from './videos.actionsTypes'

const initialState = Map().merge({
  videos: {
    count: 0,
    rows: []
  }
})

const videosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_VIDEOS:
      return state.merge({
        videos: payload
      })

    case CLEAR_VIDEOS:
      return state.merge({
        videos: []
      })

    default:
      return state
  }
}

export default videosReducer
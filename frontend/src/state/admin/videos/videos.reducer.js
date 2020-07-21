import { Map } from 'immutable'

import {
  SET_VIDEOS,
  CLEAR_VIDEOS,
  UPDATE_FILTERS
} from './videos.actionsTypes'

const initialState = Map().merge({
  videos: {
    count: 0,
    rows: []
  },
  filters: {
    page: 0,
    search: {},
    rowsPerPage: 5,
    order: 'asc',
    orderBy: 'tipo',
    selected: []
  },

})

const videosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_VIDEOS:
      return state.merge({
        videos: payload
      })

    case CLEAR_VIDEOS:
      return state.merge({
        videos: {
          count: 0,
          rows: []
        }
      })

    case UPDATE_FILTERS:
      return state.merge({
        filters: {
          ...state.get('filters'),
          ...payload
        }
      })

    default:
      return state
  }
}

export default videosReducer
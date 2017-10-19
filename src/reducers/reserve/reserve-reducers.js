import { createReducer } from 'redux-create-reducer'
import Immutable from 'immutable'
import { reserveConstants } from 'constants'

const $reserve = Immutable.fromJS({
  info: {},
  dayOfLessons: {},
})

const reserve = createReducer($reserve, {
  [reserveConstants.FETCH_RESERVE_LIST] (state, action) {
    return state.set('info', action.info).set('dayOfLessons', action.dayOfLessons)
  },
})

export default reserve
import Immutable from 'immutable'
import { practiceConstants, audioPlayerConstants } from 'constants'
import { fetchPracticeItem, fetchPracticeHistory } from 'services/practice'


const receivePracticeItem = list => ({
  list: Immutable.fromJS(list),
  type: audioPlayerConstants.FETCH_RECORD_LIST,
})

const receivePracticeInfo = info => ({
  info: Immutable.fromJS(info),
  type: practiceConstants.FETCH_PRACTICE_ITEM,
})

export const getPracticeItem = (categoryId, index) => (
  dispatch => (
    fetchPracticeItem({ category_idnumber: categoryId, index })
    .then(({ data: { audios, ...info } }) => ({
      list: audios.map(item => ({
        title: item.audio_name,
        author: item.audio_key,
        thumb: info.cover,
        source: item.audio_url,
        type: 'practice',
      })),
      info,
    })).then(({ list, info }) => {
      dispatch(receivePracticeItem(list))
      dispatch(receivePracticeInfo(info))
    })
  )
)

export const addPracticeHistory = (audioKey) => {
  return () => fetchPracticeHistory({ audio_key: audioKey })
}

import { request } from 'utils/request'

export function fetchProgressInfo (params) {
  return request({ wsfunction: 'mod_frontservice_get_enrolledlessons_cc', ...params })
}

export function fetchCancelLesson (params) {
  return request({ wsfunction: 'mod_frontservice_unenrollesson', ...params })
}

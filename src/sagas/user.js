import { put, select, takeEvery } from 'redux-saga/effects'

import { setUser } from '../reducers/user'

function * fromWatchSuccessPostSignActions () {
  const user = yield select(state => state.data.user)
  if (user) {
    yield put(setUser(user))
  }
}

export function * watchUserActions () {
  yield takeEvery(({ type }) =>
    /SUCCESS_DATA_POST_SIGN(.*)/.test(type), fromWatchSuccessPostSignActions)
}

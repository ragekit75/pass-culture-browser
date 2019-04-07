import { connect } from 'react-redux'
import { requestData } from 'redux-saga-data'
import { getRouterParamByKey, getRouterQueryByKey } from '../../../../helpers'

import RawActivationPassword from './RawActivationPassword'
import { setTokenStatus, validateToken } from '../../../../reducers/token'

import doesTokenHaveBeenChecked from '../../../../selectors/token/doesTokenHaveBeenChecked'
import isValidToken from '../../../../selectors/token/isValidToken'

export const mapDispatchToProps = dispatch => ({
  checkTokenIsValid: token =>
    validateToken(token, dispatch).then(tokenStatus => {
      dispatch(setTokenStatus(tokenStatus))
    }),

  loginUserAfterPasswordSaveSuccess: (values, fail, success) => {
    const { email: identifier, newPassword: password } = values
    const config = {
      apiPath: '/users/signin',
      body: { identifier, password },
      handleFail: fail,
      handleSuccess: success,
      method: 'POST',
    }
    dispatch(requestData(config))
  },

  sendActivationPasswordForm: (values, fail, success) =>
    // NOTE: on retourne une promise au formulaire
    // pour pouvoir gérer les erreurs de l'API
    // directement dans les champs du formulaire
    new Promise(resolve => {
      const config = {
        apiPath: '/users/new-password',
        body: { ...values },
        handleFail: fail(resolve),
        handleSuccess: success(resolve, values),
        method: 'POST',
        stateKey: 'activatedUserCredentials',
      }
      dispatch(requestData(config))
    }),
})

export const mapStateToProps = (state, { location, match }) => {
  const token = getRouterParamByKey(match, 'token')
  const email = getRouterQueryByKey(location, 'email')
  const initialValues = { email, token }
  const isValidUrl = Boolean(token && email)

  return {
    hasTokenBeenChecked: doesTokenHaveBeenChecked(state),
    initialValues,
    isValidToken: isValidToken(state),
    isValidUrl,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RawActivationPassword)
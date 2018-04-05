import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import { requestData } from '../reducers/data'

const withLogin = (config = {}) => WrappedComponent => {
  const { isRequired } = config
  const showSignModalTimeout = config.showSignModalTimeout || 500

  class _withLogin extends Component {
    constructor () {
      super()
      this.hasBackendRequest = false
    }

    componentWillMount = () => {
      const { user, requestData } = this.props
      !user && requestData('GET', `users/me`, { key: 'users', local: true })
    }

    componentWillReceiveProps = nextProps => {
      const { history, isModalActive, requestData } = this.props
      if (nextProps.user && nextProps.user !== this.props.user) {
        // BUT ACTUALLY IT IS A SUCCESS FROM THE LOCAL USER
        // NOW BETTER IS TO ALSO TO DO A QUICK CHECK
        // ON THE BACKEND TO CONFIRM THAT IT IS STILL
        // A STORED USER
        if (!this.props.user && !this.hasBackendRequest) {
          requestData('GET', `users/me`, { key: 'users' })
          this.hasBackendRequest = true
        }
        this.setState({ hasConfirmRequest: true })
      } else if (isRequired) {
        if (nextProps.user === false && this.props.user === null) {
          // CASE WHERE WE TRIED TO GET THE USER IN THE LOCAL
          // BUT WE GOT A FALSE RETURN SO WE NEED TO ASK THE BACKEND
          requestData('GET', 'users/me', { key: 'users' })
          this.hasBackendRequest = true
        } else if (!isModalActive) {
          if (nextProps.user === null && this.props.user === false) {
            // CASE WHERE WE STILL HAVE A USER NULL
            // SO WE FORCE THE SIGN MODAL
            history.push('/connexion')
          } else if (nextProps.user === false && this.props.user) {
            // CASE WE JUST SIGNOUT AND AS IS REQUIRED IS TRUE
            // WE NEED TO PROPOSE A NEW SIGNIN MODAL
            // BUT WE ARE GOING TO WAIT JUST A LITTLE BIT
            // TO MAKE A SLOW TRANSITION
            this.showSignModalTimeout = setTimeout(() =>
              history.push('/connexion'), showSignModalTimeout)
          }
        }
      }
    }

    componentWillUnmount () {
      this.requestUserMeTimeout && clearTimeout(this.requestUserMeTimeout)
      this.showSignModalTimeout && clearTimeout(this.showSignModalTimeout)
    }

    render () {
      return <WrappedComponent {...this.props} />
    }

  }
  return compose(
    withRouter,
    connect(
      state => ({ isModalActive: state.modal.isActive, user: state.user }),
      { requestData }
    )
  )(_withLogin)
}

export default withLogin

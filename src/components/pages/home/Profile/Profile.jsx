import PropTypes from 'prop-types'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { toast } from 'react-toastify'

import PageNotFoundContainer from '../../../layout/ErrorBoundaries/ErrorsPage/PageNotFound/PageNotFoundContainer'
import { getDepartment } from './domain/getDepartment'
import EditPassword from './EditPassword/EditPassword'
import LegalNotice from './LegalNotice/LegalNotice'
import MainView from './MainView/MainView'
import PersonalInformationsContainer from './PersonalInformations/PersonalInformationsContainer'
import { handleEditPasswordSubmit } from './repository/handleEditPasswordSubmit'
import User from './ValueObjects/User'

const Profile = ({ history, match, user }) => {
  const { email, departmentCode } = user
  const department = getDepartment(departmentCode)
  const pathToProfilePage = `${match.path}/profil`

  return (
    <Switch>
      <Route
        exact
        path={`${pathToProfilePage}/mot-de-passe`}
      >
        <EditPassword
          handleSubmit={handleEditPasswordSubmit}
          historyPush={history.push}
          pathToProfile={pathToProfilePage}
          triggerSuccessSnackbar={toast.success}
          user={user}
        />
      </Route>
      <Route
        exact
        path={`${pathToProfilePage}/informations`}
      >
        <PersonalInformationsContainer
          department={department}
          historyPush={history.push}
          pathToProfile={pathToProfilePage}
          triggerSuccessSnackbar={toast.success}
          user={user}
        />
      </Route>
      <Route
        exact
        path={`${pathToProfilePage}/mentions-legales`}
      >
        <LegalNotice
          historyPush={history.push}
          pathToProfile={pathToProfilePage}
          userEmail={email}
        />
      </Route>
      <Route
        exact
        path={pathToProfilePage}
      >
        <MainView
          historyPush={history.push}
          user={user}
        />
      </Route>
      <Route>
        <PageNotFoundContainer />
      </Route>
    </Switch>
  )
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  user: PropTypes.shape(User).isRequired,
}

export default Profile
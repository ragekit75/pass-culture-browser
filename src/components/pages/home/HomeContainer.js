import withRequiredLogin from '../../hocs/with-login/withRequiredLogin'
import withTracking from '../../hocs/withTracking'
import { selectCurrentUser } from '../../../redux/selectors/currentUserSelector'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectUserGeolocation } from '../../../redux/selectors/geolocationSelectors'
import { updateCurrentUser } from '../../../redux/actions/currentUser'
import Home from './Home'

export const mapStateToProps = state => ({
  geolocation: selectUserGeolocation(state),
  user: selectCurrentUser(state),
})

export const mapDispatchToProps = () => ({ updateCurrentUser })

export const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  trackAllModulesSeen: numberOfModules => {
    ownProps.tracking.trackEvent({
      action: 'AllModulesSeen',
      name: `Number of modules: ${numberOfModules}`,
    })
  },
  trackAllTilesSeen: (moduleName, numberOfModules) => {
    ownProps.tracking.trackEvent({
      action: 'AllTilesSeen',
      name: `Module name: ${moduleName} - Number of tiles: ${numberOfModules}`,
    })
  },
  trackConsultOffer: (moduleName, offerId) => {
    ownProps.tracking.trackEvent({
      action: 'ConsultOffer_FromHomepage',
      name: `Module name: ${moduleName} - Offer id: ${offerId}`,
    })
  },
  trackSeeMoreHasBeenClicked: moduleName => {
    ownProps.tracking.trackEvent({
      action: 'seeMoreHasBeenClicked',
      name: moduleName,
    })
  },
})

export default compose(
  withRequiredLogin,
  withTracking('Home'),
  connect(mapStateToProps, mapDispatchToProps, mergeProps)
)(Home)

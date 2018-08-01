import get from 'lodash.get'
import { createSelector } from 'reselect'

import recommendationsSelector from './recommendations'

/*
import selectRecommendationQuery from './recommendationQuery'
import selectRecommendationsWithIndex from './recommendationsWithIndex'
import getRecommendation from '../getters/recommendation'
*/

export default createSelector(
  recommendationsSelector,
  (state, offerId) => offerId,
  (state, offerId, mediationId) => mediationId,
  (recommendations, offerId, mediationId) => {
    let filteredRecommendations
    // NORMALY mediationId is ENOUGH TO FIND THE MATCHING
    // USER MEDIATION (BECAUSE WE PROPOSE ONLY ONE OFFER PER MEDIATION)
    // BUT TO BE SURE WE GET ALL THE AVAILABLES
    // (IF AT ANY CASE BACKEND ALGO SENT BACK DOUBLONS...BECAUSE OF SOME MISTAKES)
    if (mediationId) {
      filteredRecommendations = recommendations.filter(
        m => m.mediationId === mediationId
      )
    } else {
      filteredRecommendations = recommendations
    }
    // THEN DESAMBIGUATE WITH OFFER ID
    let recommendation
    if (offerId === 'tuto') {
      recommendation = get(filteredRecommendations, '0')
    } else {
      recommendation = filteredRecommendations.find(r => r.offerId === offerId)
    }
    /*
    const hydratedRecommendation = getRecommendation({
      offerId,
      recommendation,
      recommendations,
    })
    */
    return recommendation
  }
)

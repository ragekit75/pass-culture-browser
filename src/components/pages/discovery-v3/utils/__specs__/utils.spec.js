import {
  getOfferIdAndMediationIdAndCoordinatesApiPathQueryString,
  isDiscoveryStartupUrl,
  MINIMUM_DELAY_BEFORE_RELOAD_RECOMMENDATION_3_HOURS,
} from '../utils'

describe('src | components | pages | discovery | tests | helpers', () => {
  describe('handle MINIMUM_DELAY_BEFORE_RELOAD_RECOMMENDATION_3_HOURS', () => {
    it('should be equals to 3 hours in milliseconds', () => {
      const expected = 3 * 60 * 60 * 1000
      expect(MINIMUM_DELAY_BEFORE_RELOAD_RECOMMENDATION_3_HOURS).toStrictEqual(expected)
    })
  })

  describe('isDiscoveryStartupUrl', () => {
    describe('return false', () => {
      it('when match is location equals to /decouverte/details/{OfferID}/{MediationID}', () => {
        // given
        const mediationId = 'AE'
        const offerId = 'BF'
        const match = {
          params: {
            mediationId,
            offerId,
          },
          url: `/decouverte/details/${offerId}/${mediationId}`,
        }
        const result = isDiscoveryStartupUrl(match)

        const expected = false
        expect(result).toStrictEqual(expected)
      })
    })

    describe('return true', () => {
      it('when match equals /decouverte', () => {
        // given
        const match = {
          params: {},
          url: '/decouverte',
        }

        // when
        const result = isDiscoveryStartupUrl(match)

        // then
        const expected = true
        expect(result).toStrictEqual(expected)
      })

      it('when match equals /decouverte with a trailing slash', () => {
        // given
        const match = {
          params: {},
          url: '/decouverte/',
        }

        // when
        const result = isDiscoveryStartupUrl(match)

        // then
        const expected = true
        expect(result).toStrictEqual(expected)
      })

      it('when match equals /decouverte/tuto/fin', () => {
        // given
        const offerId = 'tuto'
        const mediationId = 'fin'
        const match = {
          params: {
            offerId,
            mediationId,
          },
          url: `/decouverte/${offerId}/${mediationId}`,
        }

        // when
        const result = isDiscoveryStartupUrl(match)

        // then
        const expected = true
        expect(result).toStrictEqual(expected)
      })

      it('when match equals /decouverte/tuto/fin with a trailing slash', () => {
        // given
        const offerId = 'tuto'
        const mediationId = 'fin'
        const match = {
          params: {
            offerId,
            mediationId,
          },
          url: `/decouverte/${offerId}/${mediationId}/`,
        }

        // then
        const result = isDiscoveryStartupUrl(match)

        // when
        const expected = true
        expect(result).toStrictEqual(expected)
      })
    })
  })

  describe('getOfferIdAndMediationIdAndCoordinatesApiPathQueryString', () => {
    it('when current recommendation is not the same as query param recommendation should return correct query params', () => {
      // Given
      const coordinates = {}
      const currentRecommendation = {
        mediationId: 'ABC1',
        offerId: 'ABC2',
      }
      const match = {
        params: {
          mediationId: 'ABC3',
          offerId: 'ABC2',
        },
      }

      const expected = 'offerId=ABC2&mediationId=ABC3'

      // When
      const result = getOfferIdAndMediationIdAndCoordinatesApiPathQueryString(
        match,
        currentRecommendation,
        coordinates
      )

      // Then
      expect(result).toStrictEqual(expected)
    })

    it('when current recommendation is the same as query param recommendation should return empty string', () => {
      // Given
      const coordinates = {}
      const currentRecommendation = {
        offerId: 'ABC2',
        mediationId: 'ABC1',
      }
      const match = {
        params: {
          mediationId: 'ABC1',
          offerId: 'ABC2',
        },
      }

      const expected = ''

      // When
      const result = getOfferIdAndMediationIdAndCoordinatesApiPathQueryString(
        match,
        currentRecommendation,
        coordinates
      )

      // Then
      expect(result).toStrictEqual(expected)
    })

    it('when coordinates are provided should return correct query params with latitude and longitude', () => {
      // Given
      const coordinates = {
        latitude: 2.746,
        longitude: 48.76,
      }
      const currentRecommendation = {}
      const match = {
        params: {
          mediationId: 'ABC1',
          offerId: 'ABC2',
        },
      }

      const expected = 'offerId=ABC2&mediationId=ABC1&longitude=48.76&latitude=2.746'

      // When
      const result = getOfferIdAndMediationIdAndCoordinatesApiPathQueryString(
        match,
        currentRecommendation,
        coordinates
      )

      // Then
      expect(result).toStrictEqual(expected)
    })

    it('when recommendation does not have mediation should return correct query params', () => {
      // Given
      const coordinates = {
        latitude: 2.746,
        longitude: 48.76,
      }
      const currentRecommendation = {}
      const match = {
        params: {
          offerId: 'ABC1',
        },
      }

      const expected = 'offerId=ABC1&longitude=48.76&latitude=2.746'

      // When
      const result = getOfferIdAndMediationIdAndCoordinatesApiPathQueryString(
        match,
        currentRecommendation,
        coordinates
      )

      // Then
      expect(result).toStrictEqual(expected)
    })
  })
})
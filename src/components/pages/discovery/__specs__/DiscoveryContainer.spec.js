import { mapDispatchToProps } from '../DiscoveryContainer'

import { recommendationNormalizer } from '../../../../utils/normalizers'

jest.useFakeTimers()

describe('src | components | pages | discovery | DiscoveryContainer', () => {
  let dispatch
  let replace
  let props

  beforeEach(() => {
    dispatch = jest.fn()
    replace = jest.fn()
    props = {
      history: {
        replace,
      },
      location: {
        search: '',
      },
      match: {
        params: {},
      },
      query: {
        parse: () => ({}),
      },
    }
  })

  describe('mapDispatchToProps()', () => {
    describe('when mapping loadRecommendations', () => {
      it('should load the recommendations with the right configuration', () => {
        // given
        const handleRequestSuccess = jest.fn()
        const handleRequestFail = jest.fn()
        const currentRecommendation = {}
        const recommendations = []
        const readRecommendations = null
        const shouldReloadRecommendations = false

        // when
        mapDispatchToProps(dispatch, props).loadRecommendations(
          handleRequestSuccess,
          handleRequestFail,
          currentRecommendation,
          recommendations,
          readRecommendations,
          shouldReloadRecommendations
        )

        // then
        expect(dispatch).toHaveBeenCalledWith({
          config: {
            apiPath: `/recommendations?`,
            body: {
              readRecommendations: null,
              seenRecommendationIds: [],
            },
            handleFail: handleRequestFail,
            handleSuccess: handleRequestSuccess,
            method: 'PUT',
            normalizer: recommendationNormalizer,
          },
          type: 'REQUEST_DATA_PUT_/RECOMMENDATIONS?',
        })
      })
    })

    describe('when mapping onRequestFailRedirectToHome', () => {
      it('should call setTimout 2000 times', () => {
        // when
        mapDispatchToProps(dispatch, props).onRequestFailRedirectToHome()

        // then
        expect(setTimeout).toHaveBeenCalledTimes(1)
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000)
      })

      it('should replace path by /connexion', () => {
        // given
        jest.useFakeTimers()

        // when
        mapDispatchToProps(dispatch, props).onRequestFailRedirectToHome()
        jest.runAllTimers()

        // then
        expect(replace).toHaveBeenCalledTimes(1)
        expect(replace).toHaveBeenLastCalledWith('/connexion')
      })
    })

    describe('when mapping redirectToFirstRecommendationIfNeeded', () => {
      describe('when there are no recommendations', () => {
        it('should return undefined', () => {
          // given
          const loadedRecommendations = []

          // when
          const redirect = mapDispatchToProps(
            dispatch,
            props
          ).redirectToFirstRecommendationIfNeeded(loadedRecommendations)

          // then
          expect(redirect).toBeUndefined()
        })
      })

      describe('when not on discovery pathname', () => {
        it('should return undefined', () => {
          // given
          const loadedRecommendations = [{ id: 'firstRecommendation' }]
          props.location.pathname = ''

          // when
          const redirect = mapDispatchToProps(
            dispatch,
            props
          ).redirectToFirstRecommendationIfNeeded(loadedRecommendations)

          // then
          expect(redirect).toBeUndefined()
        })
      })
    })

    describe('when mapping resetPageData', () => {
      it('should reset recommendations and bookings with the right configuration', () => {
        // when
        mapDispatchToProps(dispatch, props).resetPageData()

        // then
        expect(dispatch).toHaveBeenCalledWith({
          patch: {
            bookings: [],
            favorites: [],
            mediations: [],
            offers: [],
            recommendations: [],
            stocks: [],
          },
          type: 'ASSIGN_DATA',
        })
      })
    })

    describe('when mapping resetReadRecommendations', () => {
      it('should reset recommendations with the right configuration', () => {
        // when
        mapDispatchToProps(dispatch, props).resetReadRecommendations()

        // then
        expect(dispatch).toHaveBeenCalledWith({
          patch: { readRecommendations: [] },
          type: 'ASSIGN_DATA',
        })
      })
    })

    describe('when mapping saveLoadRecommendationsTimestamp', () => {
      it('should save recommendations loaded timestamp with the right configuration', () => {
        // when
        mapDispatchToProps(dispatch, props).saveLoadRecommendationsTimestamp()

        // then
        expect(dispatch).toHaveBeenCalledWith({
          type: 'SAVE_RECOMMENDATIONS_REQUEST_TIMESTAMP',
        })
      })
    })

    describe('when mapping showPasswordChangedPopin', () => {
      it('should return undefined when there is no password', () => {
        // when
        const popin = mapDispatchToProps(dispatch, props).showPasswordChangedPopin()

        // then
        expect(popin).toBeUndefined()
      })
    })
  })
})

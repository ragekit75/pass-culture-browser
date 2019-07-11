import set from 'lodash.set'

import { ROOT_PATH } from '../../../utils/config'
import {
  checkIsTuto,
  getBackgroundColor,
  getContentInlineStyle,
  getOfferName,
  getOfferVenueNameOrPublicName,
  mapStateToProps,
} from '../VersoContainer'

describe('src | components | verso | VersoContainer', () => {
  const backgroundColor = 'hsl(355, 100%, 7.5%)'
  const firstThumbDominantColor = [224, 108, 117]
  const backgroundImage = `url('${ROOT_PATH}/mosaic-k.png')`
  const name = 'Offer title'

  let result
  let isTuto
  let expected
  let recommendation = {}

  describe('getContentInlineStyle', () => {
    it('return only backgroundImage when is not Tuto and backGroundColor is given', () => {
      // given
      isTuto = false

      // when
      result = getContentInlineStyle(isTuto, backgroundColor)

      // then
      expected = { backgroundImage }
      expect(result).toStrictEqual(expected)
    })

    it('return backgroundImage and backgroundColor when isTuto and backgroundColor is given', () => {
      // given
      isTuto = true

      // when
      result = getContentInlineStyle(isTuto, backgroundColor)

      // then
      expected = { backgroundColor, backgroundImage }
      expect(result).toStrictEqual(expected)
    })
  })

  describe('checkIsTuto', () => {
    it('return true when tutoIndex is a Number', () => {
      // given
      recommendation = {}
      set(recommendation, 'mediation.tutoIndex', 42)

      // when
      result = checkIsTuto(recommendation)

      // then
      expect(result).toBe(true)
    })

    it('return false when tutoIndex from mediation is not given', () => {
      // given
      recommendation = {}
      set(recommendation, 'mediation.tutoIndex', null)

      // when
      result = checkIsTuto(recommendation)

      // then
      expect(result).toStrictEqual(false)
    })

    it('return false when mediation is not given', () => {
      // given
      recommendation = {}
      set(recommendation, 'mediation', null)

      // when
      result = checkIsTuto(recommendation)

      // then
      expect(result).toStrictEqual(false)
    })
  })

  describe('getOfferVenueNameOrPublicName', () => {
    it('return a venue publicName value when provided and venue name is given', () => {
      // given
      recommendation = {}
      const venueName = 'mon nom bidon'
      const venuePublicName = 'mon nom bidon mais public'
      set(recommendation, 'offer.venue.name', venueName)
      set(recommendation, 'offer.venue.publicName', venuePublicName)

      // when
      result = getOfferVenueNameOrPublicName(recommendation)

      // then
      expect(result).toStrictEqual(venuePublicName)
    })

    it('return a venue name value when provided and venue publicName is not given', () => {
      // given
      recommendation = {}
      set(recommendation, 'offer.venue.name', name)
      set(recommendation, 'offer.venue.publicName', null)

      // when
      result = getOfferVenueNameOrPublicName(recommendation)

      // then
      expected = 'Offer title'
      expect(result).toStrictEqual(expected)
    })

    it('return a venue public name value when provided and venue name is not given', () => {
      // given
      recommendation = {}
      set(recommendation, 'offer.venue.publicName', name)
      set(recommendation, 'offer.venue.name', null)

      // when
      result = getOfferVenueNameOrPublicName(recommendation)

      // then
      expected = 'Offer title'
      expect(result).toStrictEqual(expected)
    })

    it('return null when venue name or public name are not provided', () => {
      // given
      recommendation = {}
      set(recommendation, 'offer.venue')

      // when
      result = getOfferVenueNameOrPublicName(recommendation)

      // then
      expected = null
      expect(result).toStrictEqual(expected)
    })
  })

  describe('getOfferName', () => {
    it('return a string value', () => {
      // given
      recommendation = {}
      set(recommendation, 'offer.name', name)
      // when
      result = getOfferName(recommendation)
      // then
      expected = name
      expect(result).toStrictEqual(expected)
    })

    it('return null', () => {
      // given
      recommendation = {}
      set(recommendation, 'offer.name', null)
      // when
      result = getOfferName(recommendation)
      // then
      expected = null
      expect(result).toStrictEqual(expected)
    })
  })

  describe('getBackgroundColor', () => {
    it('return a string value', () => {
      // givent
      recommendation = {}
      set(recommendation, 'firstThumbDominantColor', firstThumbDominantColor)
      // then
      result = getBackgroundColor(recommendation)
      // then
      expect(result).toStrictEqual(backgroundColor)
    })
  })

  describe('mapStateToProps', () => {
    describe('ownProps should contains a recommendation object', () => {
      const throwMessage =
        'Props recommandation is missing in VersoContainer component'

      it('should throw error if a recommendation object is missing', () => {
        // given
        const state = {}
        const ownProps = {}

        // then
        expect(() => {
          mapStateToProps(state, ownProps)
        }).toThrow(throwMessage)
      })

      it('should not throw error if a recommendation object is not missing', () => {
        // given
        const state = {}
        const ownProps = { recommendation }

        // then
        expect(() => {
          mapStateToProps(state, ownProps)
        }).not.toThrow(throwMessage)
      })
    })

    it('should map the imageURL from recommendation', () => {
      // given
      const state = {}
      recommendation = {
        mediation: {
          tutoIndex: 1,
        },
        mediationId: 'H1',
        offerId: 'tuto',
        thumbUrl: 'https://example.net/image-bank/tuto.png',
      }
      const ownProps = { recommendation }

      // when
      const props = mapStateToProps(state, ownProps)

      // then
      expect(props).toHaveProperty(
        'imageURL',
        'https://example.net/image-bank/tuto.png'
      )
    })

    it('should not export a mediationId', () => {
      // given
      const state = {}
      recommendation = {
        mediation: {
          tutoIndex: 1,
        },
        mediationId: 'H1',
        offerId: 'tuto',
        thumbUrl: 'https://example.net/image-bank/tuto.png',
      }
      const ownProps = { recommendation }

      // when
      const props = mapStateToProps(state, ownProps)

      // then
      expect(props).not.toHaveProperty('mediationId')
    })
  })
})

import React from 'react'
import { shallow } from 'enzyme'

import Navigation from '../Navigation'

describe('src | components | pages | discovery | Deck | Navigation', () => {
  describe('snapshot', () => {
    it('should match snapshot', () => {
      // given
      const props = {
        backgroundGradient: 'black',
        distanceClue: '',
        flipHandler: jest.fn(),
        height: 500,
        priceRange: [],
        separator: '-',
      }

      // when
      const wrapper = shallow(<Navigation {...props} />)

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot with flipHandler', () => {
      // given
      const props = {
        backgroundGradient: 'black',
        distanceClue: '',
        flipHandler: jest.fn(),
        height: 500,
        priceRange: [],
        separator: '-',
      }

      // when
      const wrapper = shallow(<Navigation {...props} />)

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('render', () => {
    describe('background Color', () => {
      describe('when no color given in recommendation', () => {
        it('should render backgroundGradient', () => {
          // given
          const props = {
            backgroundGradient: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,back 30%,back 100%)',
            distanceClue: '',
            flipHandler: jest.fn(),
            height: 500,
            isFinished: false,
            priceRange: [],
            separator: '-'
          }

          // when
          const wrapper = shallow(<Navigation {...props} />)

          // then
          expect(wrapper.props().style.background).toStrictEqual(
            props.backgroundGradient
          )
        })
      })
    })
  })
})
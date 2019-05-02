import { shallow } from 'enzyme'
import React from 'react'
import MyBookingItem from '../MyBookingItem'
import Thumb from '../../../layout/Thumb'

describe('src | components | MyBookingItem', () => {
  it('should render the recommendation thumb URL', () => {
    // given
    const props = {
      recommendation: {
        thumbUrl: 'https://example.net/mediation/image',
      },
      timezone: 'fr-FR',
    }

    // when
    const wrapper = shallow(<MyBookingItem {...props} />)

    // then
    expect(wrapper.find(Thumb).props().src).toEqual(
      'https://example.net/mediation/image'
    )
  })
})
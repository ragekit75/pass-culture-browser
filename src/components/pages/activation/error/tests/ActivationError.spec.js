import React from 'react'
import { shallow } from 'enzyme'

import ActivationError from '../ActivationError'
import MailToLink from '../../../../layout/MailToLink'
import {
  SUPPORT_EMAIL,
  SUPPORT_EMAIL_SUBJECT,
} from '../../../../../utils/config'

describe('src | components | pages | activation | ActivationError', () => {
  it('should match snapshot', () => {
    // when
    const wrapper = shallow(<ActivationError />)

    // then
    expect(wrapper).toBeDefined()
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass props to MailToLink component', () => {
    // when
    const wrapper = shallow(<ActivationError />)
    const mailToLink = wrapper.find(MailToLink)

    // then
    expect(mailToLink).toHaveLength(1)
    expect(mailToLink.prop('email')).toStrictEqual(SUPPORT_EMAIL)
    expect(mailToLink.prop('headers')).toStrictEqual({
      subject: decodeURI(SUPPORT_EMAIL_SUBJECT),
    })
  })
})

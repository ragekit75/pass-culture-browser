/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'

import MailToLink from '../../../layout/MailToLink'
import { SUPPORT_EMAIL } from '../../../../utils/config'

const ActivationError = () => (
  <main
    role="main"
    id="activation-error-page"
    className="pc-main padded-2x flex-rows flex-center"
  >
    <div className="flex-center flex-row">
      <p className="fs20">Il semblerait que le lien cliqué soit incorrect.</p>
    </div>

    <div className="flex-center flex-row padded">
      <MailToLink
        obfuscate
        email={SUPPORT_EMAIL}
        id="activation-error-contact-us"
        className="no-background border-all rd4 py12 px18 is-inline-block is-white-text text-center fs16"
      >
        <span>Contactez-nous</span>
      </MailToLink>
    </div>
  </main>
)
export default ActivationError
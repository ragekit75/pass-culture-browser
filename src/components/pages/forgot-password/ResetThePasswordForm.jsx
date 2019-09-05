import React from 'react'
import PropTypes from 'prop-types'

import { FormError, FormFooter } from '../../forms'
import { HiddenField, PasswordField } from '../../forms/inputs'
import withResetForm from './withResetForm'

const cancelOptions = {
  className: 'is-white-text',
  disabled: false,
  label: 'Annuler',
  url: '/connexion',
}

const submitOptions = {
  className: 'is-bold is-white-text',
  label: 'OK',
}

export const RawResetThePasswordForm = ({ canSubmit, formErrors, isLoading }) => (
  <div
    className="is-full-layout flex-rows"
    id="reset-password-page-request"
  >
    <main
      className="pc-main is-white-text flex-1"
      role="main"
    >
      <div className="pc-scroll-container">
        <div className="is-full-layout flex-rows flex-center padded-2x">
          <div className="fs22">
            <h2 className="is-italic is-medium">
              <span className="is-block">{'Saisissez ci-dessous'}</span>
              <span className="is-block">{'votre nouveau mot de passe.'}</span>
            </h2>
            <p className="mt12 fs16">
              {
                'Il doit contenir au minimum 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
              }
            </p>
            <p className="is-block is-regular fs13 mt18">
              <span>{'*'}</span>
              &nbsp;{'Champs obligatoires'}
            </p>
          </div>
          <div>
            <PasswordField
              className="mt36"
              disabled={isLoading}
              label="Saisissez votre nouveau mot de passe"
              name="newPassword"
              required
              theme="primary"
            />
            <PasswordField
              className="mt36"
              disabled={isLoading}
              label="Confirmez votre nouveau mot de passe"
              name="newPasswordConfirm"
              required
              theme="primary"
            />
            <HiddenField name="token" />
            {formErrors && <FormError customMessage={formErrors} />}
          </div>
        </div>
      </div>
    </main>
    <FormFooter
      cancel={cancelOptions}
      submit={{ ...submitOptions, disabled: !canSubmit }}
    />
  </div>
)

RawResetThePasswordForm.defaultProps = {
  formErrors: false,
}

RawResetThePasswordForm.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  formErrors: PropTypes.oneOfType([PropTypes.array, PropTypes.bool, PropTypes.string]),
  isLoading: PropTypes.bool.isRequired,
}

export default withResetForm(RawResetThePasswordForm, null, '/users/new-password', 'POST')
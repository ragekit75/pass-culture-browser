/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Price from '../../../layout/Price'
import VersoPriceFormatter from './VersoPriceFormatter'

export const formatOutputPrice = (prices, devise) => {
  const [startingPrice, endingPrice] = prices
  return (
    <VersoPriceFormatter
      devise={devise}
      endingPrice={endingPrice}
      startingPrice={startingPrice}
    />
  )
}

class BookThisButton extends React.PureComponent {
  render() {
    const { linkDestination, priceValue } = this.props
    return (
      <Link
        to={linkDestination}
        id="verso-booking-button"
        className="button-with-price flex-columns is-bold is-white-text fs18"
      >
        <Price
          free="Gratuit"
          className="px6 py8 flex-columns items-center"
          value={priceValue}
          format={formatOutputPrice}
        />
        <hr className="dotted-left-2x-white no-margin" />
        <span className="button-label px6 py8">J&apos;y vais!</span>
      </Link>
    )
  }
}

BookThisButton.propTypes = {
  linkDestination: PropTypes.string.isRequired,
  priceValue: PropTypes.array.isRequired,
}

export default BookThisButton

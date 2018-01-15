import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import OfferItem from '../components/OfferItem'
import OfferNewButton from '../components/OfferNewButton'
import withLogin from '../hocs/withLogin'
import { requestData } from '../reducers/data'

class ProfessionalHomePage extends Component {
  handleRequestData = props => {
    const { requestData, sellerId } = props
    if (!this.hasRequired && sellerId) {
      requestData('GET', `offers?sellerId=${sellerId}`)
      this.hasRequired = true
    }
  }
  componentWillMount () {
    this.props.sellerId && this.handleRequestData(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.sellerId && nextProps.sellerId !== this.props.sellerId) {
      this.handleRequestData(nextProps)
    }
  }
  render () {
    const { offers } = this.props
    return (
      <main className='spreadsheet-page p2'>
        <OfferNewButton />
        {
          offers && offers.map((offer, index) => (
            <OfferItem key={index} {...offer} />
          ))
        }
      </main>
    )
  }
}

export default compose(
  withLogin,
  connect(
    state =>({
      offers: state.data.offers,
      sellerId: state.user && state.user.sellerId
    }),
    { requestData }
  )
)(ProfessionalHomePage)

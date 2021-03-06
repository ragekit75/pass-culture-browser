import { shallow } from 'enzyme'
import React from 'react'
import Result from '../Result/Result'
import { ResultsList } from '../ResultsList'

describe('component | ResultsList', () => {
  let props
  beforeEach(() => {
    props = {
      currentPage: 1,
      geolocation: {
        latitude: null,
        longitude: null,
      },
      isLoading: false,
      loadMore: jest.fn(),
      results: [
        {
          _geoloc: {
            lat: 0,
            lng: 1,
          },
          offer: {
            dates: [1585484866, 1585484866],
            departementCode: 54,
            id: 'AE',
            isDuo: false,
            label: 'Livre',
            name: 'Les fleurs du mal',
            priceMin: 8,
            priceMax: 12,
            prices: [8, 12],
            thumbUrl: '/lien-vers-mon-image',
          },
          objectID: 'AE',
        },
        {
          _geoloc: {
            lat: 0,
            lng: 1,
          },
          offer: {
            dates: [1585484866, 1585484866],
            departementCode: 54,
            id: 'BF',
            isDuo: false,
            label: 'Livre',
            name: 'Le spleen de Paris',
            priceMin: 8,
            priceMax: 12,
            prices: [8, 12],
            thumbUrl: '/lien-vers-mon-image',
          },
          objectID: 'BF',
        },
      ],
      resultsCount: 2,
      search: '',
      totalPagesNumber: 1,
    }
  })

  it('should display Result component for each result', () => {
    // When
    const wrapper = shallow(<ResultsList {...props} />)

    // Then
    const resultsComponent = wrapper.find(Result)
    expect(resultsComponent).toHaveLength(2)
    expect(resultsComponent.at(0).prop('geolocation')).toStrictEqual({
      longitude: null,
      latitude: null,
    })
    expect(resultsComponent.at(0).key()).toBe('AE')
    expect(resultsComponent.at(0).prop('result')).toStrictEqual({
      _geoloc: {
        lat: 0,
        lng: 1,
      },
      offer: {
        dates: [1585484866, 1585484866],
        departementCode: 54,
        id: 'AE',
        isDuo: false,
        label: 'Livre',
        name: 'Les fleurs du mal',
        priceMin: 8,
        priceMax: 12,
        prices: [8, 12],
        thumbUrl: '/lien-vers-mon-image',
      },
      objectID: 'AE',
    })
    expect(resultsComponent.at(0).prop('search')).toBe('')
    expect(resultsComponent.at(1).prop('geolocation')).toStrictEqual({
      longitude: null,
      latitude: null,
    })
    expect(resultsComponent.at(1).key()).toBe('BF')
    expect(resultsComponent.at(1).prop('result')).toStrictEqual({
      _geoloc: {
        lat: 0,
        lng: 1,
      },
      offer: {
        dates: [1585484866, 1585484866],
        departementCode: 54,
        id: 'BF',
        isDuo: false,
        label: 'Livre',
        name: 'Le spleen de Paris',
        priceMin: 8,
        priceMax: 12,
        prices: [8, 12],
        thumbUrl: '/lien-vers-mon-image',
      },
      objectID: 'BF',
    })
    expect(resultsComponent.at(1).prop('search')).toBe('')
  })

  it('should display the number of results in plural', () => {
    // Given
    props.resultsCount = 2

    // When
    const wrapper = shallow(<ResultsList {...props} />)

    // Then
    const numberOfResults = wrapper.find({ children: '2 résultats' })
    expect(numberOfResults).toHaveLength(1)
  })

  it('should display the number of results in singular', () => {
    // Given
    props.resultsCount = 1

    // When
    const wrapper = shallow(<ResultsList {...props} />)

    // Then
    const numberOfResults = wrapper.find({ children: '1 résultat' })
    expect(numberOfResults).toHaveLength(1)
  })

  it('should display the number of results with a space every 3 digits', () => {
    // Given
    props.resultsCount = 1000000

    // When
    const wrapper = shallow(<ResultsList {...props} />)

    // Then
    const numberOfResults = wrapper.find({ children: '1 000 000 résultats' })
    expect(numberOfResults).toHaveLength(1)
  })
})

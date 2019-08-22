import moment from 'moment'
import { getDisplayPrice, isSameDayInEachTimezone } from '../../../../helpers'

const parseHoursByStockId = (allFormValues, format = 'HH:mm') => {
  const hasBookableDates =
    allFormValues &&
    allFormValues.bookables &&
    Array.isArray(allFormValues.bookables) &&
    allFormValues.bookables.length > 0 &&
    allFormValues.date &&
    allFormValues.date.date &&
    moment.isMoment(allFormValues.date.date)
  if (!hasBookableDates) return []
  const { date, bookables } = allFormValues

  return bookables
    .filter(o => o.id && typeof o.id === 'string')
    .filter(o => moment.isMoment(o.beginningDatetime))
    .filter(o => isSameDayInEachTimezone(date.date, o.beginningDatetime))
    .map(obj => {
      const time = obj.beginningDatetime.format(format)
      const devised = getDisplayPrice(obj.price)
      const label = `${time} - ${devised}`
      return { id: obj.id, label }
    })
}

export default parseHoursByStockId
// Write your code here
import {Component} from 'react'
import './index.css'

class AppointmentItem extends Component {
  render() {
    const {apppointmentsList, startedOn} = this.props
    const {searchInput, formatedDate, isFavourite, id} = apppointmentsList

    const onStarted = () => {
      startedOn(id)
    }

    const isliked = isFavourite
      ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    return (
      <li className="appiontment-item">
        <div className="container1">
          <p className="heading">{searchInput}</p>
          <button
            type="button"
            className="button"
            data-testid="star"
            onClick={onStarted}
          >
            <img src={isliked} alt="star" className="star-image" />
          </button>
        </div>
        <p className="date-para">{formatedDate}</p>
      </li>
    )
  }
}

export default AppointmentItem

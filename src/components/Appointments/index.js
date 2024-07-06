// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {searchInput: '', date: '', apppointmentsList: [], clicked: true}

  onTexting = event => {
    this.setState({searchInput: event.target.value})
  }

  onDate = event => {
    this.setState({date: event.target.value})
  }

  onAddApoointment = event => {
    event.preventDefault()
    const {searchInput, date} = this.state
    const formatedDate = format(new Date(date), 'dd MMMM yyyy,EEEE')
    const newComment = {
      id: uuidv4(),
      searchInput,
      formatedDate,
      isFavourite: false,
    }
    this.setState(prevState => ({
      apppointmentsList: [...prevState.apppointmentsList, newComment],
      searchInput: '',
      date: '',
    }))
  }

  startedOn = id => {
    this.setState(prevState => ({
      apppointmentsList: prevState.apppointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isFavourite: true}
        }
        return each
      }),
    }))
  }

  onFiltter = () => {
    const {apppointmentsList, clicked} = this.state
    const filtered = apppointmentsList.filter(each => each.isFavourite === true)
    if (clicked) {
      this.setState({apppointmentsList: filtered})
      this.setState({clicked: !clicked})
    } else {
      this.setState(prevState => ({
        apppointmentsList: [...prevState.apppointmentsList],
      }))
    }
  }

  render() {
    const {searchInput, date, apppointmentsList} = this.state
    console.log(apppointmentsList)
    return (
      <div className="big-container">
        <div className="small-container">
          <div className="small-container1">
            <div className="from-container">
              <h1 className="heading">Add Appointment</h1>
              <form
                onSubmit={this.onAddApoointment}
                className="form-container1"
              >
                <label className="label-title" htmlFor="input">
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  className="input-element"
                  id="input"
                  onChange={this.onTexting}
                  value={searchInput}
                />
                <label className="label-title" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  className="input-element"
                  onChange={this.onDate}
                  value={date}
                />
                <button type="submit" className="button2">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="separator" />
          <div className="results-container">
            <h1 className="results-heading">Appointments</h1>
            <button type="button" className="button1" onClick={this.onFiltter}>
              Starred
            </button>
          </div>
          <ul className="results-container1">
            {apppointmentsList.map(each => (
              <AppointmentItem
                apppointmentsList={each}
                key={each.id}
                startedOn={this.startedOn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments

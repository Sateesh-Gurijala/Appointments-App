// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onaAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy,EEEE')
      : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredAppointmentList = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(each => each.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredAppointmentList = this.getFilteredAppointmentList()
    const filterClassName = isFilterActive ? 'filter-filled ' : 'filter-empty'
    return (
      <div className="app-container">
        <div className="card-container">
          <div className="card-input-image-container">
            <div className="input-image-container">
              <form className="form" onSubmit={this.onaAddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  className="input"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  placeholder="Title"
                  type="text"
                />
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  className="input"
                  id="date"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                  placeholder="dd/mm/yyyy"
                  type="date"
                />
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>

              <div className="img">
                <img
                  alt="appointments"
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                />
              </div>
            </div>
            <hr className="hr" />
            <div className="appointment-item-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                type="button"
                onClick={this.onClickFilter}
                className={`filter-style ${filterClassName}`}
              >
                Starred
              </button>
            </div>
            <ul className="list-appointment-items">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments

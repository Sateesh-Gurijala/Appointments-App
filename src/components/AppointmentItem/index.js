// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="appointment-star-container">
        <p className="title">{title}</p>
        <button
          className="star"
          type="button"
          onClick={onClickStar}
          testid="star"
        >
          <img alt="star" src={starImageUrl} />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem

const NotificationConfirm = ({ message }) => {
  if (message === null) {
    return null
  }
  else {
    return (
      <div className="confirm">
        {message}
      </div>
    )
  }

}

export default NotificationConfirm
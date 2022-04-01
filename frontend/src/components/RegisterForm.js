import PropTypes from 'prop-types'

const RegisterForm = ({
  registerNewUser,
  setNewUsername,
  setNewPassword,
  newUsername,
  newPassword,
  name,
  setName
}) => {
  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={registerNewUser} autoComplete="new-password">
        <div>
                    username
          <input
            value={newUsername}
            onChange={setNewUsername}
            autoComplete="off"
          />
        </div>
        <div>
                    password
          <input
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            autoComplete="off"
          />
        </div>
        <div>
                    display name
          <input
            value={name}
            onChange={setName}
            autoComplete="off"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
RegisterForm.propTypes = ({
  registerNewUser:PropTypes.func.isRequired,
  setNewUsername:PropTypes.func.isRequired,
  setNewPassword:PropTypes.func.isRequired,
  newUsername:PropTypes.string.isRequired,
  newPassword:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  setName:PropTypes.func.isRequired,
})
export default RegisterForm
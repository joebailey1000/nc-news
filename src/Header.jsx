
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const Header = ({ loggedInUser, setLoggedInUser }) => {
  const navigate=useNavigate()

  return (
    <div className="flex-div header">
      <Link to='/'><h1>NC NEWS</h1></Link>
      {loggedInUser ? (
        <div className="log-in-button">
          <Link className='log-in-button' to='/profile'>Profile</Link>
          <button onClick={() => {
            setLoggedInUser(false)
            navigate('')
            }}>Log Out</button>
        </div>
      ) : (
        <Link className='log-in-button' to='/login'>Log In</Link>
      )}

    </div>
  )
}
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const Header = ({ loggedInUser, setLoggedInUser }) => {
  const navigate=useNavigate()

  return (
    <div className="flex-div header">
      <button id='title-button' onClick={()=>navigate('/')}><h1>NC NEWS</h1></button>
      {loggedInUser ? (
        <div>
          <button className='log-in-button' onClick={()=>navigate('/profile')}>Profile</button>
          <button className='log-in-button' onClick={() => {
            setLoggedInUser(false)
            navigate('')
            }}>Log Out</button>
        </div>
      ) : (
        <button className='log-in-button' onClick={()=>navigate('/login')}>Log In</button>
      )}
    </div>
  )
}

import { useNavigate } from "react-router-dom"
import logout from './assets/log-out.jpg'
import defaultProfile from './assets/default.png'

export const Header = ({ loggedInUser, setLoggedInUser }) => {
  const navigate=useNavigate()

  return (
    <div className="flex-div header">
      <button id='title-button' onClick={()=>navigate('/')}><h1>NC NEWS</h1></button>
      {loggedInUser ? (
        <div>
          <button className='log-in-button' onClick={()=>navigate('/profile')}><img id='default-profile' src={defaultProfile}/></button>
          <button className='log-in-button' onClick={() => {
            setLoggedInUser(false)
            navigate('')
            }}><img id='logout' src={logout}/></button>
        </div>
      ) : (
        <button className='log-in-button' onClick={()=>navigate('/login')}>Log In</button>
      )}
    </div>
  )
}
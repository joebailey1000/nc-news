
import { Link } from "react-router-dom"

export const Header = ({ loggedInUser, setLoggedInUser }) => {


  return (
    <div className="flex-div">
      <h1>NC NEWS</h1>
      {loggedInUser ? (
        <>
          <h4>Welcome {loggedInUser}!</h4>
          <button onClick={() => setLoggedInUser(false)}>Log Out</button>
        </>
      ) : (
        <Link to='/login'>Log In</Link>
      )}

    </div>
  )
}
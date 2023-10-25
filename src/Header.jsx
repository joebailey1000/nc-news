import { getUsers } from "./utils/axios"
import { useState } from "react"
import { ColorRing } from "react-loader-spinner"

export const Header = ({ loggedInUser, setLoggedInUser }) => {
  const [loginInput, setLoginInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex-div">
      <h1>NC NEWS</h1>
      {loggedInUser ? (
        <>
          <h4>Welcome {loggedInUser}!</h4>
          <button onClick={() => setLoggedInUser(false)}>Log Out</button>
        </>
      ) : (
        <form onSubmit={(e) => {
          e.preventDefault()
          setIsLoading(true)
          getUsers()
            .then(res => {
              if (res.map(user => user.username).includes(loginInput)) {
                setLoggedInUser(loginInput)
                setLoginInput('')
              } else alert('That user doesn\'t exist...')
              setIsLoading(false)
            })
        }}>
          <label htmlFor='log-in'>Enter your Username:</label>
          <input onChange={(e) => setLoginInput(e.target.value)} id='log-in'></input>
          {isLoading ? (<ColorRing
            visible={true}
            height="20"
            width="20"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#ff0800', '#ff0800', '#ff0800', '#ff0800', '#ff0800']}
          />) : (<button type='submit'>Log In</button>)}
        </form>
      )}

    </div>
  )
}
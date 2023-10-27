import { useState, useEffect } from "react"
import { getUsers } from "./utils/axios"
import { ColorRing } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"

export const LogIn = ({ setLoggedInUser }) => {
  const [loginInput, setLoginInput] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [validUsers, setValidUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getUsers()
      .then(res => {
        setValidUsers(res.map(user => user.username))
        setIsLoading(false)
      })
  }, [])

  return isLoading ? (<div className="center-div"><p>Loading...</p></div>) : (
    <div className="center-div">
    <div className="parent">
      <form className='article-card' onSubmit={(e) => {
        e.preventDefault()
        if (validUsers.includes(loginInput)) {
          setLoggedInUser(loginInput)
          setLoginInput('')
        } else alert('That user doesn\'t exist...')
        navigate('/')

      }}>
        <label htmlFor='log-in'>Enter your Username:</label>
        <input onChange={(e) => setLoginInput(e.target.value)} id='log-in'></input>
        <button type='submit'>Log In</button>
      </form>
      <h3>Registered users (use any of these)</h3>
      <ul>
        {validUsers.map(user => {
          return (
            <li>{user}</li>
          )
        })}
      </ul>
    </div>
    </div>
  )
}
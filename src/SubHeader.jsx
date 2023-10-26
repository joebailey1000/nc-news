
import { useNavigate } from "react-router-dom"

export const SubHeader=()=>{
const navigate=useNavigate()

  return (
    <div className="center-div">
      <div id='subheader'>
        <button className='sub-header-button' id='left-shbutton' onClick={()=>navigate('/articles')}>Articles</button>
        <button className='sub-header-button' onClick={()=>navigate('/topics')}>Topics</button>
      </div>
    </div>
  )
}
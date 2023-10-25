export const PageSwitcher = ({pageNumber,setPageNumber, pageLength})=>{
  return (
    <form className="page-switch-div">
      <button disabled={pageNumber===1} className="page-button" type='button' onClick={()=>setPageNumber(p=>p-1)}>{'<'}</button>
      <p>Page {pageNumber}</p>
      <button disabled={pageLength<10} className='page-button' type='button' onClick={()=>setPageNumber(p=>p+1)}>{'>'}</button>
    </form>
  )
}
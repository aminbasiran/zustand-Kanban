import React from 'react'

const DropItem = ({open, setOpen}) => {
  return (
    <div >
        <h2 className='text-zinc-600 text-lg mb-3 '>Empty list</h2>
        <div  onClick={()=>setOpen(!open)} className='border-dashed border-2 cursor-pointer border-zinc-700 py-10 rounded-md'>
            <h1 className='text-zinc-600'>Drop item here</h1>
        </div>
    </div>
  )
}

export default DropItem

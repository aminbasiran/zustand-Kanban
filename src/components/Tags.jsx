import React from 'react'
import { useStore } from '../zustand'

const Tags = ({tags,title}) => {


    const deleteTags = useStore(store => store.deleteTags)
    return (
        <div>
            <ul className='flex flex-row my-3  text-xs gap-3'>
                {tags.map((tag,index)=> 
                    <li key={index}>
                        <p className='p-1 bg-blue-400 rounded-md'>{tag}<span className='ml-3 font-extrabold'>x</span></p>
                    </li>            
                )}                  
            </ul>
        </div>
    )
}

export default Tags

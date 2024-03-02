import React, {useState} from 'react'
import Task from './Task'
import { useStore } from '../zustand'
import clsx from 'clsx'
import { hashtagWrapper } from '../utils/hashtagWrapper'
import DropItem from './DropItem'

const Column = ({state}) => {

    const buttonClasses = clsx(
        'text-xs text-center py-[0.1rem] px-1 rounded-md text-black font-bold ',
        { 'bg-zinc-400': state === "Planned"},
        { 'bg-indigo-400': state === "In-progress"},
        { 'bg-yellow-300': state === "Review"},
        { 'bg-green-400': state === "Done"}
    );

    const [tags,setTags] = useState([])
    const [text,setText] = useState("")
    const [open,setOpen] = useState(false)
    const [criticality,setCriticality] = useState("")
    
    const addTags = (e) => {
        if(e.key === "Enter"){
            setTags([...tags,hashtagWrapper(e.target.value)])
            e.target.value = ""
        }
    }

    const handleCriticality = (e) => {
        setCriticality(e.target.value)
    }


    const tasks = useStore(store => store.tasks.filter(task => task.state === state)) 
    const addTask = useStore(store => store.addTask)
    const setDraggedItem = useStore(store => store.setDraggedItem)
    const draggedItem = useStore(store => store.draggedItem)
    const moveTask = useStore(store => store.moveTask)

    return (
        <div onDragOver={(e)=>e.preventDefault()} onDrop={()=> {moveTask(draggedItem.title,state,draggedItem.tags,draggedItem.criticality),
                                                                setDraggedItem(null)   
                                                            }} 
        className={`flex-grow ${tasks.length === 0 ? "border-4 border-dashed border-neutral-400/30" : "rounded-lg bg-zinc-900" }  min-h-64 p-3`}>
            <div className='flex flex-row mb-2 justify-between'>
                <div className='flex gap-2 place-items-center'>
                    <h1>{state}</h1>
                    <p className={buttonClasses}>{tasks.length}</p>
                </div>
                <button className="cursor-pointer" onClick={()=>setOpen(!open)} ><h1 className='text-xl font-bold'>+</h1></button>

            </div>
            <div className='flex flex-col gap-4 '>
                {tasks.length === 0 ? <DropItem/> : tasks.map(task => <Task key={task.title}  title={task.title} state={task.state} tags={task.tags} criticality={task.criticality}/>)}
            </div>
            {open && <div  onClick={()=>setOpen(!open)} className='absolute top-0 left-0 w-full h-full bg-gray-800/30'>
                    
                    <div className='grid place-items-center h-full'> 
                    
                        <div onClick={(e) => e.stopPropagation()} className='flex flex-col gap-2 bg-[#242424] p-4 rounded-lg'>
                            <input  className='rounded-md px-2 py-1 text-xs' type="text" placeholder='Add task' value={text}  onChange={(e)=> setText(e.target.value)}/>
                            <div className='border-[1px] border-zinc-700 rounded-md flex'>
                                <ul className='flex flex-row p-2 text-xs gap-3'>
                                    {tags.map((tag,index)=> 
                                        <li key={index}>
                                            <p className='p-1 bg-blue-400 rounded-md'>{tag}<span className='ml-3 font-extrabold'>x</span></p>
                                        </li>            
                                    )}
                                    
                                </ul>
                                <input type="text" placeholder='Press enter to add tags' className='focus:outline-none text-xs p-2 bg-transparent ' onKeyUp={addTags} />
                            </div>
                            <div>
                                <select value={criticality} onChange={handleCriticality}>
                                    <option value="">Select criticality</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <button onClick={()=>{
                                    if(text === ""){
                                        return alert("insert task")
                                    }

                                    addTask(text,state,tags,criticality)
                                    setText("")
                                    setCriticality("")
                                    setTags([])
                                    setOpen(()=>setOpen(!open))
                                }} type='buttton' className='text-xs'>Submit</button>
                        </div>
                    
                    
                    </div>


                    
                    
                </div>}
        </div>
    )
}

export default Column

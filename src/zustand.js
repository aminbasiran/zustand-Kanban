import {create} from "zustand";

const store = (set) => ({
    tasks : [{title:"SquashHUB", state: "Planned"},{title:"Squash-API", state: "Done"},{title:"amnbsrn.dev", state: "Ongoing"}],
    draggedTask : null,
    addTask : (title,state) => set(store=>({tasks:[...store.tasks,{title,state}]})),
    deleteTask :(title) => set(store=> ({tasks: store.tasks.filter(task => task.title !== title)})),
    setDraggedTask : (title) => set(store => ({draggedTask: title})),
    moveTask : (title,state) => set(store => ({tasks: store.tasks.map(task => (task.title === title ? {title,state} : task))}))
})


export const useStore = create(store)
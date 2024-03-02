import {create} from "zustand";

const store = (set) => ({
    tasks : [],
    draggedItem : { title: null, tags: [] },
    addTask : (title,state,tags) => set(store=>({tasks:[...store.tasks,{title,state,tags}]})),
    deleteTask :(title) => set(store=> ({tasks: store.tasks.filter(task => task.title !== title)})),
    setDraggedItem : (title,tags) => set(store => ({draggedItem: {title,tags}})),
    moveTask : (title,state,tags) => set(store => ({tasks: store.tasks.map(task => (task.title === title ? {title,state,tags: tags || []} : task))})),
    deleteTags : (title,tagToRemove) => set(store => ({tasks:store.tasks.map(task => {
        if(task.title === title){
            return {...task,tags:task.tags.filter(tag => tag !== tagToRemove)}
        }

        return task
    })}))
})


export const useStore = create(store)
import {create} from "zustand";

const store = (set) => ({
    tasks : [],
    draggedItem : { title: null, tags: [] },
    addTask : (title,state,tags,criticality) => set(store=>({tasks:[...store.tasks,{title,state,tags,criticality}]})),
    deleteTask :(title) => set(store=> ({tasks: store.tasks.filter(task => task.title !== title)})),
    setDraggedItem : (title,tags,criticality) => set(store => ({draggedItem: {title,tags,criticality}})),
    moveTask : (title,state,tags,criticality) => set(store => ({tasks: store.tasks.map(task => (task.title === title ? {title,state,tags: tags || [],criticality} : task))})),
    deleteTags : (title,tagToRemove) => set(store => ({tasks:store.tasks.map(task => {
        if(task.title === title){
            return {...task,tags:task.tags.filter(tag => tag !== tagToRemove)}
        }

        return task
    })}))
})


export const useStore = create(store)
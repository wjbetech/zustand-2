// THIS IS THE ZUSTAND "STORE"

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid"

// define type of Status
export type Status = "TODO" | "IN_PROGRESS" | "DONE"

// define the data shape of a task
export type Task = {
  id: string
  title: string
  description?: string
  status: Status
}

// define the state shape as an array of Task
export type State = {
  tasks: Task[],
  draggedTask: string | null
}

// define our actions 
export type Actions = {
  addTask: (title: string, description: string) => void
  removeTask: (id: string) => void
  updateTask: (id: string, status: Status) => void
  dragTask: (id: string | null) => void
}


export const useTaskStore = create<State & Actions>()(
  persist(
    set => ({
      tasks: [],
      draggedTask: null,
      // return all tasks, add new task with uuID to the end
      // with the status automatically set to "TODO"
      addTask: (title: string, description: string) => set((state) => ({
        tasks: [
          ...state.tasks,
          {id: uuidv4(), title, description, status: "TODO"}
        ]
      })),
      // filter array of tasks for all tasks that don't have
      // the id we pass in
      removeTask: (id: string) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),
      // map over all tasks to find task with id === passed in id
      // and then set that task status to new status to new status
      // [ or return the task as is ]
      updateTask: (id: string, status: Status) => set((state) => ({
        tasks: state.tasks.map((task) => task.id === id ? {...task, status} : task)
      })),
      dragTask: (id: string | null) => set(() => ({
        draggedTask: id
      }))
}), { name: "task-store", skipHydration: true }))
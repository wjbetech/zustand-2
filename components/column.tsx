"use client"

import { useMemo, useEffect } from "react"
import { useTaskStore, Status } from "@/lib/store"
import Task from './task'

export default function Column({
  title,
  status
}: {
  title: string
  status: Status
}) {

  // grab our tasks from zustand store hook!
  // MUST SET "USE CLIENT"
  const tasks = useTaskStore(state => state.tasks)

  // use useMemo to only re-compute when 
  // tasks or status are updated
  const filteredTasks = useMemo(() => tasks.filter(task => task.status === status), [tasks, status])

  // handle draggable functionality
  const updateTask = useTaskStore(state => state.updateTask)
  const draggedTask = useTaskStore(state => state.draggedTask)
  const dragTask = useTaskStore(state => state.dragTask)

  useEffect(() => {
    useTaskStore.persist.rehydrate()
  }, [])

  const handleDrop = () => {
    if (!draggedTask) return
    updateTask(draggedTask, status)
    dragTask(null)
  }

  return (
    <section className='h-[600px] flex-1'>
      <h2 className='ml-1 font-serif text-2xl font-semibold text-center'>{title}</h2>

      <div className='mt-3.5 h-full w-full flex-1 rounded-xl bg-gray-700/50 p-4' onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <div className='flex flex-col gap-4'>
          {filteredTasks.map(task => (
            <Task key={task.id} {...task} />
          ))}
        </div>
      </div>
    </section>
  )
}

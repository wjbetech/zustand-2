"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"

import { useTaskStore as store, useTaskStore } from "@/lib/store"

export function NewTaskDialog() {

  // functionality for dialog box
  const addTask = useTaskStore(state => state.addTask)
  
  // handleSubmit func
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    // prevent re-render/reload
    e.preventDefault()

    console.log("clicked add task!")
    
    // sort form data
    const form = e.currentTarget;
    const formData = new FormData(form);
    // make sure names match inputs
    const {title, description} = Object.fromEntries(formData);

    // sanitize form data
    if (typeof title !== "string" || typeof description !== "string") return

    // pump data
    addTask(title, description);

    console.log("pumped data!")

  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>
        <form id="todo-form" onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className=" items-center gap-4">
              <Input id="title" name="title" placeholder="Task Title" className="col-span-3 outline-none" />
            </div>
            <div className="items-start gap-4">
              <Textarea id="description" name="description" placeholder="Task Description" className="col-span-3 resize-none outline-none" />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" form="todo-form">Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

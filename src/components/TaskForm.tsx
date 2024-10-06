import React, { useState, useEffect } from 'react'
import { Calendar, Clock } from 'lucide-react'

// Define the Task interface
interface Task {
  TaskName: string
  TaskPath: string
  State: string
  LastRunTime: string
  NextRunTime: string
}

// Define the props for the TaskForm component
interface TaskFormProps {
  onSubmit: (task: Task) => void
  onCancel: () => void
  initialData?: Task | null
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, initialData }) => {
  // State to hold the current task data
  const [task, setTask] = useState<Task>({
    TaskName: initialData?.TaskName || '',
    TaskPath: initialData?.TaskPath || '',
    State: initialData?.State || '',
    LastRunTime: initialData?.LastRunTime || '',
    NextRunTime: initialData?.NextRunTime || '',
  })

  // Update the task state when initialData changes
  useEffect(() => {
    if (initialData) {
      setTask(initialData)
    }
  }, [initialData])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTask({ ...task, [name]: value })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(task)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md mb-4">
      {/* Task Name input */}
      <div className="mb-4">
        <label htmlFor="TaskName" className="block text-sm font-medium text-gray-700 mb-1">
          Task Name
        </label>
        <input
          type="text"
          id="TaskName"
          name="TaskName"
          value={task.TaskName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/* State input */}
      <div className="mb-4">
        <label htmlFor="State" className="block text-sm font-medium text-gray-700 mb-1">
          State
        </label>
        <input
          type="text"
          id="State"
          name="State"
          value={task.State}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {/* Last Run Time input */}
      <div className="mb-4">
        <label htmlFor="LastRunTime" className="block text-sm font-medium text-gray-700 mb-1">
          Last Run Time
        </label>
        <div className="flex items-center">
          <Calendar className="mr-2" />
          <input
            type="text"
            id="LastRunTime"
            name="LastRunTime"
            value={task.LastRunTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {/* Next Run Time input */}
      <div className="mb-4">
        <label htmlFor="NextRunTime" className="block text-sm font-medium text-gray-700 mb-1">
          Next Run Time
        </label>
        <div className="flex items-center">
          <Calendar className="mr-2" />
          <input
            type="text"
            id="NextRunTime"
            name="NextRunTime"
            value={task.NextRunTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {/* Form buttons */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  )
}

export default TaskForm
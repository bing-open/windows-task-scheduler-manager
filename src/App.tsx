import React, { useState, useEffect } from 'react'
import { Calendar, Clock, Plus, Edit, Trash2 } from 'lucide-react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { API_URL } from './config'

// Define the Task interface
interface Task {
  TaskName: string
  TaskPath: string
  State: string
  LastRunTime: string
  NextRunTime: string
}

function App() {
  // State hooks for managing tasks, form visibility, and editing state
  const [tasks, setTasks] = useState<Task[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    fetchTasks()
  }, [])

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`)
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  // Function to add a new task
  const addTask = async (task: Omit<Task, 'TaskPath' | 'State'>) => {
    try {
      await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      })
      fetchTasks()
      setIsFormOpen(false)
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  // Function to update an existing task
  const updateTask = async (updatedTask: Task) => {
    try {
      await fetch(`${API_URL}/api/tasks/${updatedTask.TaskName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask)
      })
      fetchTasks()
      setEditingTask(null)
      setIsFormOpen(false)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  // Function to delete a task
  const deleteTask = async (taskName: string) => {
    try {
      await fetch(`${API_URL}/api/tasks/${taskName}`, {
        method: 'DELETE'
      })
      fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Windows Task Scheduler Manager</h1>
      <button
        onClick={() => setIsFormOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center"
      >
        <Plus className="mr-2" /> Add New Task
      </button>
      {isFormOpen && (
        <TaskForm
          onSubmit={editingTask ? updateTask : addTask}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingTask(null)
          }}
          initialData={editingTask}
        />
      )}
      <TaskList
        tasks={tasks}
        onEdit={(task) => {
          setEditingTask(task)
          setIsFormOpen(true)
        }}
        onDelete={deleteTask}
      />
    </div>
  )
}

export default App
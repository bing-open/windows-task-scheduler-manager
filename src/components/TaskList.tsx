import React from 'react'
import { Clock, Edit, Trash2 } from 'lucide-react'

// Define the Task interface
interface Task {
  TaskName: string
  TaskPath: string
  State: string
  LastRunTime: string
  NextRunTime: string
}

// Define the props for the TaskList component
interface TaskListProps {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (taskName: string) => void
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Task Name</th>
            <th className="px-4 py-2 text-left">State</th>
            <th className="px-4 py-2 text-left">Last Run</th>
            <th className="px-4 py-2 text-left">Next Run</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.TaskName} className="border-b">
              <td className="px-4 py-2">{task.TaskName}</td>
              <td className="px-4 py-2">{task.State}</td>
              <td className="px-4 py-2">{task.LastRunTime}</td>
              <td className="px-4 py-2">{task.NextRunTime}</td>
              <td className="px-4 py-2">
                {/* Edit button */}
                <button
                  onClick={() => onEdit(task)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit className="h-5 w-5" />
                </button>
                {/* Delete button */}
                <button
                  onClick={() => onDelete(task.TaskName)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskList
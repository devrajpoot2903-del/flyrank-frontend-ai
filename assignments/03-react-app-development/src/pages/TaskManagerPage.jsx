import { useState } from 'react'
import AppHeader from '../components/AppHeader'
import FilterSection from '../components/FilterSection'
import SearchSection from '../components/SearchSection'
import StatisticsSection from '../components/StatisticsSection'
import TaskInputSection from '../components/TaskInputSection'
import TaskListSection from '../components/TaskListSection'
import { createTask } from '../utils/taskHelpers'
import '../styles/task-manager.css'

function TaskManagerPage() {
  const [tasks, setTasks] = useState([])

  const handleAddTask = (title, priority) => {
    const task = createTask(title, priority)

    if (!task) {
      return
    }

    setTasks((prevTasks) => [task, ...prevTasks])
  }

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="task-manager">
      <AppHeader />
      <main className="task-manager__main">
        <StatisticsSection />
        <TaskInputSection onAddTask={handleAddTask} />
        <SearchSection />
        <FilterSection />
        <TaskListSection
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
        />
      </main>
    </div>
  )
}

export default TaskManagerPage

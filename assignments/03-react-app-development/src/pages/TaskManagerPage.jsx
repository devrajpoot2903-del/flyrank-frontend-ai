import AppHeader from '../components/AppHeader'
import FilterSection from '../components/FilterSection'
import SearchSection from '../components/SearchSection'
import StatisticsSection from '../components/StatisticsSection'
import TaskInputSection from '../components/TaskInputSection'
import TaskListSection from '../components/TaskListSection'
import '../styles/task-manager.css'

function TaskManagerPage() {
  return (
    <div className="task-manager">
      <AppHeader />
      <main className="task-manager__main">
        <StatisticsSection />
        <TaskInputSection />
        <SearchSection />
        <FilterSection />
        <TaskListSection />
      </main>
    </div>
  )
}

export default TaskManagerPage

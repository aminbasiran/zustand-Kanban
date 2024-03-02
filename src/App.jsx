
import './App.css'
import Column from './components/Column'

function App() {

  return (
    <div>

      <h1 className='text-3xl font-bold mb-4'  > Zustand Kanban App Tracker</h1>
      <div className='flex flex-col gap-5 justify-center md:flex-row '>
        <Column state="Planned"/>
        <Column state="Ongoing"/>
        <Column state="Done"/>


      </div>
    </div>
  )
}

export default App

import { RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'
import { routes } from './components/routes'

export default function App() {
  return (
    <div>
      <NavBar />
      <RouterProvider router={routes} />
    </div>
  )
}

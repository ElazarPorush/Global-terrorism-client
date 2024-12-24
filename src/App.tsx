import { RouterProvider } from 'react-router-dom'
import NavBar from './components/NavBar'
import { routes } from './components/routes'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

export default function App() {
  return (
    <div>
      <NavBar />
      <RouterProvider router={routes} />
      <Fab color="primary" aria-label="add" href="/add" style={{ position: 'fixed', right: '1em', bottom: '1em' }}>
        <AddIcon />
      </Fab>
    </div>
  )
}

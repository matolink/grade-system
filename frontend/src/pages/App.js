import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './index.jsx'
import './App.css'
// en el app deberia poner el componente de ruteo
// acá defino qué componente renderear según la ruta en la que estoy navegando

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/route' element={<Index />}>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
